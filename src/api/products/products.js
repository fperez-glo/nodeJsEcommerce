import express from 'express';
import { productDao } from '../../daos/index.js';
import { console as cLog } from '../../helpers/logger.js';

const { Router } = express;
const app = express();

const router = new Router();

function isAdmin(req, res, next) {
    console.log('req:', req.body)
    if(req.body.administrador){
        next();
    } else {
        res.send({message: `error: -1, ruta ${req.url} metodo ${req.method} no autorizada.`})
    }
}


/** Devuelve todos los productos */
router.get('/',
async (req, res) => {
    let fieldName
    if(req.session.authorized){
        if(req.session.fieldName) {
            fieldName = req.session.fieldName;
        }
        const products = await productDao.getAll();
        
        res.render('index',{ products, authorized:req.session.authorized, fieldName });
    } else {
        res.redirect('/');
    }
});

/** Recibe y agrega un producto */
router.post('/',
async ({ body }, res) => {
    try {
        const itemCreated = await productDao.save(body);
        res.send(itemCreated);
        res.redirect('/');
    } catch (err) {
        cLog.error(`[ERROR]: ${err}`);
        res.send({err});
    };
});

/** Recibe y actualiza un producto */
router.put('/:id',
async ({ body, params }, res) => {
    try {
        const message = 'Producto actualizado.';
        const { id } = params;
        await productDao.updateItem(id, body);
        cLog.info(message);
        res.send({message});
    } catch (err) {
        cLog.error(`[ERROR]: ${err}`);
        res.send({err});
    };
});

/** Elimina un producto segun su id */
router.delete('/:id',
async ({ params }, res) => {
    try {
        const message = 'Producto eliminado.';
        const { id } = params;
        await productDao.delete({sku: id});
        cLog.info(message);
        res.send({message});
    } catch (err) {
        cLog.error(`[ERROR]: ${err}`);
        res.send({err});
    };
});

/** Elimina todos los productos */
router.delete('/',
async (req, res) => {
    try {
        const message = 'Se eliminaron todos los productos';
        await productDao.deleteAll();
        cLog.info(message);
        res.send({message});
    } catch (error) {
        cLog.error(`[ERROR]: ${err}`);
        res.send({error});
    };
});

app.use(isAdmin);

export default router;