import { ProductService } from "../services/products.service.js";
import { console as cLog } from '../../helpers/logger.js';

export class ProductController extends ProductService {
  constructor() {
    super();
  }

  async getToHome (req, res) {
    let fieldName
    if(req.session.authorized){
        if(req.session.fieldName) {
            fieldName = req.session.fieldName;
        }
        const products = await super.getAllProds();
        console.log('OBTENGO LOS PRODUCTOS POR REPOSITORY!!:', products)
        res.render('index',{ products, authorized:req.session.authorized, fieldName });
    } else {
        res.redirect('/');
    }
}

async getAllProduct (req, res) {
    try {
        
        const products = await super.getAllProds();
    
        res.status(201).json({products});
    } catch (err) {
        cLog.error(`[ERROR]: ${err}`);
        res.send({err});
    }
}

async postProduct ({ body }, res) {
    try {
        const itemCreated = await super.postProduct(body);
        res.status(202).json({itemCreated});
        res.redirect('/');
    } catch (err) {
        cLog.error(`[ERROR]: ${err}`);
        res.status(303).json({err});
    };
}

async putProduct ({ body, params }, res) {
    try {
        const message = 'Producto actualizado.';
        const { id } = params;
        await super.putProduct(id, body);
        cLog.info(message);
        res.send({message});
    } catch (err) {
        cLog.error(`[ERROR]: ${err}`);
        res.send({err});
    };
}

async deleteProduct ({ params }, res) {
    try {
        const message = 'Producto eliminado.';
        const { id } = params;
        await super.deleteProduct(id);
        cLog.info(message);
        res.status(203).json({message});
    } catch (err) {
        cLog.error(`[ERROR]: ${err}`);
        res.status(303).json({err});
    };
}

async deleteAllProducts (req, res) {
    try {
        const message = 'Se eliminaron todos los productos';
        await super.deleteAllProducts();
        cLog.info(message);
        res.send({message});
    } catch (error) {
        cLog.error(`[ERROR]: ${err}`);
        res.send({error});
    };
}
}
