const express = require(`express`);

const app = express();
const port = process.env.PORT || 8080;

const Contenedor = require("./Contenedor")
const itemContainer = new Contenedor();

//RUTAS
app.get(`/`, (req, res) => {
    //send permite enviar string / objetos o JSON tambien.
    res.json({json: `Envio un JSON`})
})

app.get(`/api`, (req, res) => {
    //send permite enviar string / objetos o JSON tambien.
    res.send({message: `Entraste a la ruta /api`})
})

app.get(`/productos`, async(req, res) => {
    //send permite enviar string / objetos o JSON tambien.
    
    const productos =  await itemContainer.getAll();
    res.send(productos);
    
    // res.send(itemContainer.getAll());
})

app.get(`/productoRandom`, async(req, res) => {
    //send permite enviar string / objetos o JSON tambien.
   
    const productos =  await itemContainer.getAll()
    const randomProduct = productos[Math.floor(Math.random()*productos.length)];
    res.send(randomProduct);

    // res.send(itemContainer.getAll());
})


app.listen(port, ()=>{
    console.log(`Server run on port ${port}.`)
})