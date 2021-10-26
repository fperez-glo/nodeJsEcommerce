const express = require(`express`);
const multer = require('multer')

const app = express();
const port = process.env.PORT || 8080;

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

app.post('/', update.single('fileUpload'), (req, res) => {
    console.log(req.file)
    res.send(`Archivo guardado con exito.`)
});

const prodRoutes = require('./router/routes/products/products');
const cartRoutes = require('./router/routes/cart/cart');
const authRoutes = require('./router/routes/auth/auth');

const desafioClase7 = require('./router/routes/api/productos')

//Este midleware te permite recibir el body que se envia como JSON desde POSTMAN por ej.
app.use(express.json());

//Rutas definidas
app.use('/products', prodRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);

//Para el desafio de la clase 7
app.use('/api/productos', desafioClase7);

app.listen(port, ()=>{
    console.log(`Server run on port ${port}.`)
})