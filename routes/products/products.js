const express = require(`express`);
const { Router } = express;

const { productDao } = require('../../daos/index')

const router = new Router();

/** Devuelve todos los productos */
router.get('/',
async (req, res) => {
    let user
    if(req.session.authorized){
        if(req.session.user) {
            user = req.session.user;
        }
        const products = await productDao.getAll();
        console.log(products)
        res.render('index',{ products, authorized:req.session.authorized, user });
    } else {
        res.redirect('/');
    }
});

/** Devuelve un producto segun su id */
router.get('/:id',
async ({ params }, res) => {
    try {
        const { id } = params;
        const product = await productDao.getById(id);
        
        res.send({product})
    } catch (err) {
        res.send({err});
    };
});

/** Recibe y agrega un producto */
router.post('/',
async ({ body }, res) => {
    try {
        const itemCreated = await productDao.save(body);
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
        await productDao.updateItem(id, body);
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
        await productDao.deleteById(id);
        res.send({message: 'Producto eliminado.'})
    } catch (err) {
        res.send({err})
    };
    
});

router.delete('/',
async (req, res) => {
    try {
        await productDao.deleteAll();
        res.send({message: 'Se eliminaron todos los productos'});
    } catch (error) {
        res.send({error})
    }
   
});

module.exports = router