require('dotenv').config();
const express = require('express');
const compression = require('compression');

const { NODE_ENVIORMENT } = process.env;

const app = express();

//Permite la compresion del servidor.
//Esto se utiliza en produccion para optimizar la velocidad de la aplicacion.
app.use(compression());



app.get('/', (req,res) => {
    if (NODE_ENVIORMENT === "prod") {
        return res.send('hola desde prod');
    }

    res.send('hola 1 sola vez')
    
})

app.listen(8080, () => {
    console.log('Servidor ok 8080')
});