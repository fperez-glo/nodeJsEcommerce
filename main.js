//Lo pongo momentaneamente para el desafio de webSockets
import fs from 'fs';
import moment from 'moment';
//---
import http from 'http'
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';


//CLUSTER MODULE
import cluster from 'cluster';
import {cpus as cpuQty } from 'os';

import { Server } from 'socket.io';
import clsProducts from './src/api/products/clsProducts.js';
import authApi from './src/api/auth/auth.js';
import prodApi from './src/api/products/products.js';
import cartApi from './src/api/cart/cart.js';

const { MODE, PORT } = process.env;

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
    const {pathname: root} = new URL('../', import.meta.url)
    const app = express();
    const port = PORT || 8080;

    //Este midleware inicia una session.
    app.use(
        session({
            store: MongoStore.create({
            mongoUrl:
                "mongodb+srv://developer:developer@ecommerceatlas.js6ut.mongodb.net/ecommerce?retryWrites=true&w=majority",
            }),
            secret: "facuSecret",
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
        res.send({message: `error: -2, descripcion: ruta ${req.url} metodo: ${req.method} no implementada.`})
    }
    //Importo la clase clsProducts para trabajar con los productos
    const itemContainer = new clsProducts();

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
    app.use('/api/carrito', cartApi);
    app.use('/', authApi);

    app.use(ifRouteNotExists);

    //Server compatible para webSockets
    const server = http.createServer(app);

    //Socket
    const io = new Server(server);

    //Conexion con el Socket para el cliente.
    io.on("connection", ( socket )=> {
        
        console.log('Se ha conectado un cliente')

        socket.on("clietProdSend", async(prod)=>{
            //Guardo el producto en mi array/database local.
            const { title, price, thumbnail } = prod
            const itemCreated = await itemContainer.save({ title, price, thumbnail });
            
            //Obtengo todos los productos actualizados
            //Tuve que hacerlo de esta forma ya que el metodo save es el que me genera el identificador al producto ingresado.
            const products = await itemContainer.getAll();
            
            //Envio los productos a los clientes.
            io.sockets.emit('serverProductsResponse',products)
            
        })

        socket.on('clientDeleteItem', async(prodId) => {
            try {
                const filteredProducts = await itemContainer.deleteById(prodId);
                io.sockets.emit('serverProductsResponse',filteredProducts)
            } catch (error) {
                console.log('Salio por el catch de clientDeleteItem. Error: ',error)
            }
            
        })

        socket.on('userMessage', async(message) => {
            const date = moment()
            const dateFormat = 'DD/MM/YYYY hh:mm:ss';
            const fileRead = await fs.promises.readFile(`${root}src/chat.txt`, `utf-8`);
            const chats = JSON.parse(fileRead);

            message.datetime = date.format(dateFormat);
            chats.push(message)

            await fs.promises.writeFile(
                `${root}src/chat.txt`,
                JSON.stringify(chats, null, 2) + `\n`
            );

            io.sockets.emit('serverChatResponse',chats);
            
        });
        
    });


    app.listen(port, ()=> {
        if (!cluster.isPrimary) {
          console.log(`Worker process start ${process.pid}, port: ${port}`)
        } else {
          console.log(`Server pId: ${process.pid}, port: ${port}`)
        };
      }); 

  }


