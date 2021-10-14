const express = require(`express`);

const app = express();
const port = process.env.PORT || 5000;

//RUTAS
app.get(`/`, (req, res) => {
    //send permite enviar string / objetos o JSON tambien.
    res.json({json: `Envio un JSON`})
})

app.get(`/api`, (req, res) => {
    //send permite enviar string / objetos o JSON tambien.
    res.send({message: `Entraste a la ruta /api`})
})

app.listen(port, ()=>{
    console.log(`Server run on port ${port}.`)
})