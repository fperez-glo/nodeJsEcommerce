const { parse } = require("dotenv");
const express = require(`express`);
const { Router } = express
const { fork } = require('child_process')


const router = new Router();




router.get('/:cant?',(req, res) => {
    
    let cant = req.query?.cant;

    if (!cant) {
        cant = 100000000;
    };

    const calculoNoLock = fork(`${__dirname}/calculo.js`);
    calculoNoLock.send({message: 'start', cant: parseInt(cant)});

    calculoNoLock.on('message', (calculoFinal) => {
        res.json({calculoFinal});
    });
    
})

module.exports = router