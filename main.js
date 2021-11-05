const express = require(`express`);
const multer = require('multer');

const app = express();
const port = process.env.PORT || 8080;

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


app.post('/', update.single('fileUpload'), (req, res) => {
    console.log(req.file)
    res.send(`Archivo guardado con exito.`)
});


//Server compatible para webSockets
const http = require('http');
const server = http.createServer(app);

//Socket
const { Server } = require('socket.io');
const io = new Server(server);

//Conexion con el Socket para el cliente.
io.on("connection", ( socket )=> {

    console.log('cliente conectado')
    socket.emit("message","Hola señor cliente, esta conectado")

    socket.on("clientResponse",(data)=>{
        console.log('Respuesta del cliente: ',data)
    })

});

app.get('/', (req, res)=> {
    res.render('index');
});

// app.get('/', (req, res)=> {
//     res.sendFile(__dirname+'/public/index.html');
// });





server.listen(port, ()=>{
    console.log(`Server run on port ${port}.`)
});