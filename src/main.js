//Lo pongo momentaneamente para el desafio de webSockets
import fs from 'fs';
import moment from 'moment';
//---
import http from 'http'
import express from 'express';
import multer from 'multer';

import authApi from './api/auth/auth.js';
import prodApi from './api/products/products.js';
import cartApi from './api/cart/cart.js';
import { Server } from 'socket.io';
import clsProducts from './api/products/clsProducts.js';

//Me traigo el pathname para reemplazar al __dirname en los ES6modules
const {pathname: root} = new URL('../', import.meta.url)
const app = express();
const port = process.env.PORT || 8080;

const isRouteExists = (req, res, next) => {
    res.send({message: `error: -2, descripcion: ruta ${req.url} metodo: ${req.method} no implementada.`})
}
//Importo la clase clsProducts para trabajar con los productos
const itemContainer = new clsProducts();

//Seteo las rutas del motor de plantillas ejs.
app.set('view engine', 'ejs');
//app.set('views', root + 'src/views');

//Configurar multer para poder recibir archivos con distintos formatos.
const storage = multer.diskStorage({

    destination: (req, file, cb)=> {
        //recibe el nombre de la carpeta donde se va a guardar la informacion.
        cb(null, './multer/update');
    },
    filename: (req, file, cb)=> {
        //recibe el nombre con el cual se va a guardar el archivo.
        cb(null, `file_${file.originalname}`);
    },
});

const update = multer({ storage }); // Middleware




//Este midleware te permite recibir el body que se envia como JSON desde POSTMAN por ej.
app.use(express.json());
//Este midleware te permite recibir el body que se envia como POST desde un formulario HTML
app.use(express.urlencoded({extended: false}));

//app.use(express.static(root + 'src/views'))



function isAdmin(req, res, next) {
    if(req.body.administrador){
        next();
    } else {
        res.send({message: `error: -1, ruta ${req.url} metodo ${req.method} no autorizada.`})
    }
}
app.use(isAdmin);



//Rutas definidas
app.use('/api/productos', prodApi);
app.use('/api/carrito', cartApi);
app.use('/api/auth', authApi);

//Lo comento momentaneamente para que no utilice esta ruta post a "/"
// app.post('/', update.single('fileUpload'), (req, res) => {
//     console.log(req.file)
//     res.send(`Archivo guardado con exito.`)
// });
app.use(isRouteExists);

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


server.listen(port, ()=>{
    console.log(`Server run on port ${port}.`)
});