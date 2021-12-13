const express = require(`express`);
const { Router } = express;
const clsProducts = require('./clsProductsMysql');
//Importo variables para usar con la arquitectura DAOs
const { productosDao } = require('../../daos/index.js')

const router = new Router();

/** Devuelve todos los productos */
router.get('/',
async (req, res) => {
    const products = await productosDao.getAll();
    res.send({ products })
    //TODO: comento momentaneamente esto para evitar errores llamando desde la api. Esto es para que nomas renderice el motor de plantillas.
    //res.render('index',{ products });
});

/** Devuelve un producto segun su id */
router.get('/:id',
async ({ params }, res) => {
    try {
        const { id } = params;
        const product = await productosDao.getById(id);
        
        res.send({product})
    } catch (err) {
        res.send({err});
    };
});

/** Recibe y agrega un producto */
router.post('/',
async ({ body }, res) => {
    try {
        const itemCreated = await productosDao.save(body);
        //res.send(itemCreated)
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
        await productosDao.updateItem(id, body);
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
        await productosDao.deleteById(id);
        res.send({message: 'Producto eliminado.'})
    } catch (err) {
        res.send({err})
    };
    
});

router.delete('/',
async (req, res) => {
    try {
        await productosDao.deleteAll();
        res.send({message: `Se eliminaron todos los productos.`});
    } catch (error) {
        res.send({error})
    }
   
});

module.exports = router