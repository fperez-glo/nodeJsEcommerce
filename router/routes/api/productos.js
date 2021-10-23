const express = require(`express`);
const { Router } = express;
const Contenedor = require('../../../Contenedor');

const itemContainer = new Contenedor();

const router = new Router();

/** Devuelve todos los productos */
router.get('/',
async (req, res) => {
    const products = await itemContainer.getAll();
    res.send({products});
});

/** Devuelve un producto segun su id */
router.get('/:id',
async ({ params }, res) => {
    try {
        const { id } = params;
        const product = await itemContainer.getById(id);
        if (product){
            res.send({product})
        }else {
            throw `Producto no encontrado`;
        };
    } catch (err) {
        res.send({err});
    };
});

/** Recibe y agrega un producto */
router.post('/',
async ({ body }, res) => {
    try {
        const { title, price, thumbnail } = body
        const itemCreated = await itemContainer.save({ title, price, thumbnail });
        res.send(itemCreated)

    } catch (err) {
        res.send({err})
    };
});

/** Recibe y actualiza un producto */
router.put('/:id',
async ({ body, params }, res) => {
    try {
        const { id } = params;
        await itemContainer.updateItem(parseInt(id), body);
        res.send({message: 'Producto actualizado.'})
    } catch (err) {
        res.send({err})
    }
    
});

/** Elimina un producto segun su id */
router.delete('/:id',
async (req, res) => {
    res.send({message: 'Elimino un producto'})
});


module.exports = router