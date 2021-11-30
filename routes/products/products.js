const express = require(`express`);
const { Router } = express;
const connections = require('../database/connection')
const mysqlKnex = require ('knex')(connections.mysql);
const clsProducts = require('./clsProducts');

const itemContainer = new clsProducts(mysqlKnex);

const router = new Router();

/** Devuelve todos los productos */
router.get('/',
async (req, res) => {
    const products = await itemContainer.getAll();
    res.render('index',{ products });
    
});

/** Devuelve un producto segun su id */
router.get('/:id',
async ({ params }, res) => {
    try {
        const { id } = params;
        const product = await itemContainer.getById(id);
        
        res.send({product})
    } catch (err) {
        res.send({err});
    };
});

/** Recibe y agrega un producto */
router.post('/',
async ({ body }, res) => {
    try {
        const itemCreated = await itemContainer.save(body);
        res.send(itemCreated)
        res.redirect('/');
    } catch (err) {
        res.send({err})
    };
});

/** Recibe y actualiza un producto */
router.put('/:id',
async ({ body, params }, res) => {
    try {
        const { id } = params;
        console.log('id:',id)
        await itemContainer.updateItem(id, body);
        res.send({message: 'Producto actualizado.'})
    } catch (err) {
        res.send({err})
    }
    
});

/** Elimina un producto segun su id */
router.delete('/:id',
async ({ params }, res) => {
    try {
        const { id } = params;
        await itemContainer.deleteById(id);
        res.send({message: 'Producto eliminado.'})
    } catch (err) {
        res.send({err})
    };
    
});

router.delete('/',
async (req, res) => {
    try {
        await itemContainer.deleteAll();
        res.send({message: 'Se eliminaron todos los productos'});
    } catch (error) {
        res.send({error})
    }
   
});

module.exports = router