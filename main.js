const express = require(`express`);
const multer = require('multer');

const app = express();
const port = process.env.PORT || 8080;

//Importo la clase contenedor para trabajar con los productos
const Contenedor = require('./Contenedor');
const itemContainer = new Contenedor();

//Seteo las rutas del motor de plantillas ejs.
app.set('view engine', 'ejs');
app.set('views', './views');

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

const prodRoutes = require('./routes/products/products');
const cartRoutes = require('./routes/cart/cart');
const authRoutes = require('./routes/auth/auth');


//Este midleware te permite recibir el body que se envia como JSON desde POSTMAN por ej.
app.use(express.json());
//Este midleware te permite recibir el body que se envia como POST desde un formulario HTML
app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname+'/views'))

//Rutas definidas
app.use('/', prodRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);

//Lo comento momentaneamente para que no utilice esta ruta post a "/"
// app.post('/', update.single('fileUpload'), (req, res) => {
//     console.log(req.file)
//     res.send(`Archivo guardado con exito.`)
// });


//Server compatible para webSockets
const http = require('http');
const server = http.createServer(app);

//Socket
const { Server } = require('socket.io');
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
        io.sockets.emit('serverResponse',products)
        
    })
    
});


server.listen(port, ()=>{
    console.log(`Server run on port ${port}.`)
});