const express = require(`express`);
const { Router } = express


const router = new Router();

router.get('/',(req, res) => {
    res.send({message: 'Estas en la ruta products'})
})

module.exports = router