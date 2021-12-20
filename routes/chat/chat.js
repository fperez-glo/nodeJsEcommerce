const express = require(`express`);
const { Router } = express;
const connections = require('../database/connection')
const mysqlKnex = require ('knex')(connections.mysql);


const router = new Router();

/** Devuelve todos los productos */
router.get('/',
async (req, res) => {
    // const products = await itemContainer.getAll();
    res.render('normalizrChat');
    
});


module.exports = router