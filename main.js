import 'dotenv/config';
import http from 'http'
import express from 'express';
import passport from 'passport';
import { ifRouteNotExists, infoLogger, createMongoSession } from './src/midleware/midleware.js';
import { socketConnect } from './src/helpers/webSocket.js';
//Socket
import { Server } from 'socket.io';
//CLUSTER MODULE
import cluster from 'cluster';
import {cpus as cpuQty } from 'os';

import authApi from './src/api/routes/auth.routes.js';
import prodApi from './src/api/routes/products.routes.js';
import cartApi from './src/api/routes/cart.routes.js';

import {sendWhatsapp} from './src/helpers/twilio.js'


const { MODE, LOCAL_PORT } = process.env;


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
    //Me traigo el pathname para reemplazar al __dirname en los ES6modules
    //const {pathname: root} = new URL('../', import.meta.url)
    const app = express();
    const port = process.env.PORT || LOCAL_PORT || 8080;

    //Middleware logger
    app.use(infoLogger);

    //Este midleware inicia una session.
    app.use(createMongoSession());

    //Inicializo passport
    app.use(passport.initialize());
    app.use(passport.session())

    

    //Seteo las rutas del motor de plantillas ejs.
    app.set('view engine', 'ejs');
    app.set('views', 'src/views');

    //Este midleware te permite recibir el body que se envia como JSON desde POSTMAN por ej.
    app.use(express.json());
    //Este midleware te permite recibir el body que se envia como POST desde un formulario HTML
    app.use(express.urlencoded({extended: false}));


    app.post('/wp', async(req,res)=> {
      try {
        const message = await sendWhatsapp('Detalle del pedido:');
        res.json({message})
      } catch (error) {
        console.log('error:',error)
        res.json({error})
      }
     
    })

    //Rutas definidas
    app.use('/home', prodApi);
    app.use('/cart', cartApi);
    app.use('/', authApi);

    app.use(ifRouteNotExists);

    //Server compatible para webSockets
    const server = http.createServer(app);
    //Socket
    const io = new Server(server);

    //Conexion con el Socket para el cliente.
    io.on("connection", (socket)=> {socketConnect(socket)});

    app.listen(process.env.PORT || port, ()=> {
        if (!cluster.isPrimary) {
          console.log(`Worker process start ${process.pid}, port: ${port}`)
        } else {
          console.log(`Server pId: ${process.pid}, port: ${port}`)
        };
      }); 

  }


