import 'dotenv/config';
import http from 'http'
import path, { dirname }  from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { ifRouteNotExists, infoLogger, graphQLHTTP } from './src/midleware/midleware.js';
import { socketConnect } from './src/helpers/webSocket.js';
//Socket
import { Server } from 'socket.io';
//CLUSTER MODULE
import cluster from 'cluster';
import {cpus as cpuQty } from 'os';

import authApi from './src/api/routes/auth.routes.js';
import prodApi from './src/api/routes/products.routes.js';
import cartApi from './src/api/routes/cart.routes.js';
import getHome from './src/api/routes/renderHome.routes.js';

export const app = express();
const { MODE, PORT, MONGOCONNECTSTRING, SECRET } = process.env;

if (cluster.isPrimary && MODE === 'CLUSTER') {
    console.log(`Proceso Master ejecutandose en pId: ${process.pid}`)
  
    //Worker generator
    for (let i = 0; i < cpuQty().length; i++) {
      cluster.fork();
    };
  
    //listen para liberar los procesos.
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died.`)
    });
  
  } else {
    const port = PORT || 8080;
    //Middleware logger
    app.use(infoLogger);

    //Este midleware inicia una session.
    app.use(
        session({
            store: MongoStore.create({
            mongoUrl:
              MONGOCONNECTSTRING,
            }),
            secret: SECRET,
            resave: true,
            saveUninitialized: true,
            //Esto no funciona muy bien ya que el servidor toma la hora local que no es la de Argentina.
            cookie: {
                maxAge: 600000, //10 minutos de expiracion de la sesion.
            }
        })
        );

    //Inicializo passport
    app.use(passport.initialize());
    app.use(passport.session());

    //Midleware de GraphQL
    app.use('/graphql', graphQLHTTP)

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

   //Seteo las rutas del motor de plantillas ejs.
    app.set('view engine', 'ejs');
    app.set('views','./src/views');

    //Este midleware te permite recibir el body que se envia como JSON desde POSTMAN por ej.
    app.use(express.json());
    //Este midleware te permite recibir el body que se envia como POST desde un formulario HTML
    app.use(express.urlencoded({extended: false}));

    app.use(express.static(__dirname+"/src/views"))

    //Rutas definidas
    app.use('/home', getHome);
    app.use('/products', prodApi);
    app.use('/cart', cartApi);
    app.use('/', authApi);

    app.use(ifRouteNotExists);

    //Server compatible para webSockets
    const server = http.createServer(app);
    //Socket
    const io = new Server(server);

    //Conexion con el Socket para el cliente.
    io.on("connection", (socket)=> {socketConnect(io,socket)});

    server.listen(process.env.PORT || port, ()=> {
        if (!cluster.isPrimary) {
          console.log(`Worker process start ${process.pid}, port: ${port}`)
        } else {
          console.log(`Server pId: ${process.pid}, port: ${port}`)
        };
      });

  }