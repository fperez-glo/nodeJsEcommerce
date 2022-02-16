
import moment from 'moment';
//---
import http from 'http'
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { console as cLog } from './src/helpers/logger.js'

//CLUSTER MODULE
import cluster from 'cluster';
import {cpus as cpuQty } from 'os';

import { Server } from 'socket.io';
import { chatDao } from "./src/daos/index.js";
import authApi from './src/api/auth/auth.js';
import prodApi from './src/api/products/products.js';
import cartApi from './src/api/cart/cart.js';

import { normalize, schema } from 'normalizr';

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

    //Definicion de las entidades para normalizar la data del chat
    const authorSchema = new schema.Entity("author", {}, { idAttribute: "email" });
    const mensajeSchema = new schema.Entity(
    "post",
    { author: authorSchema },
    { idAttribute: "id" }
    );
    const mensajesSchema = new schema.Entity(
    "posts",
    { mensajes: [mensajeSchema] },
    { idAttribute: "mensajes" }
    );

    //Me traigo el pathname para reemplazar al __dirname en los ES6modules
    const {pathname: root} = new URL('../', import.meta.url)
    const app = express();
    const port = PORT || 8080;

    const infoLogger = ({method, originalUrl}, {statusCode}, next) => {
        const logInfo = `Request: [${method}] ${originalUrl}`;

        console.log('statusCode:',statusCode)
        
        cLog.info(logInfo)
        next();
    };

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
    app.use(passport.session())

    const ifRouteNotExists = (req, res, next) => {
        const message = `error: -2, descripcion: ruta "${req.url}" no implementada, metodo: ${req.method}.`
        res.render('./error_views/404notFound', {message})
       // res.send({message: `error: -2, descripcion: ruta ${req.url} metodo: ${req.method} no implementada.`})
    };

    //Seteo las rutas del motor de plantillas ejs.
    app.set('view engine', 'ejs');
    app.set('views', 'src/views');

    //Este midleware te permite recibir el body que se envia como JSON desde POSTMAN por ej.
    app.use(express.json());
    //Este midleware te permite recibir el body que se envia como POST desde un formulario HTML
    app.use(express.urlencoded({extended: false}));

    //app.use(express.static(root + 'src/views'))



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
io.on("connection", (socket) => {
    console.log("Se ha conectado un cliente al Chat");
  
    //ACA RECIBO EL MENSAJE DESDE LA RUTA "/" DONDE SE ENCUENTRA EL CHAT
    socket.on("userMessage", async (message) => {
      message.timeStamp = moment();
      await chatDao.save(message);
      //Luego de guardar levanto los mensajes para devolverlos por websocket.
      const chats = await chatDao.getAll();
  
      io.sockets.emit("serverChatResponse", chats);
    });
  
    //LE ENVIO LA ACCION PARA VACIAR EL CHAT.
    socket.on("clientEmptyChat", async () => {
      await chatDao.deleteAll();
  
      //Luego de guardar levanto los mensajes para devolverlos por websocket.
      const chats = await chatDao.getAll();
  
      io.sockets.emit("serverChatResponse", chats);
    });
  
    //ENVIO LOS MENSAJES GUARDADOS EN LA BASE DE DATOS NI BIEN SE AUTENTICA.
    socket.on("clientAuth", async () => {
      let mensajes = {};
      //Cuando se autentica un usuario le envio los mensajes para pintarlos en pantalla sin tener que enviar un mensaje antes.
      const chats = await chatDao.getAll();
  
      mensajes = { mensajes: chats, id: "msg" };
      // console.log('Largo sin normalizar:',JSON.stringify(mensajes).length)
  
      //console.log(mensajes)
      const messageNormalize = normalize(mensajes, mensajesSchema);
      print(messageNormalize);
  
      io.sockets.emit("serverChatResponse", chats);
    });
  });
  
  const print = (objeto) => {
    const msg = util.inspect(objeto, false, 12, true);
    console.log("msgg:", msg);
  };


    app.listen(port, ()=> {
        if (!cluster.isPrimary) {
          console.log(`Worker process start ${process.pid}, port: ${port}`)
        } else {
          console.log(`Server pId: ${process.pid}, port: ${port}`)
        };
      }); 

  }


