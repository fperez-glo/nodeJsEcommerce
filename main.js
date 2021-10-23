const express = require(`express`);


const app = express();
const port = process.env.PORT || 8080;
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