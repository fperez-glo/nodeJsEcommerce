import { productDao } from "../../models/daos/index.js";

export class ProductService {

    async getAllProds (searchFilter = undefined) {
        return await productDao.getAllProds(searchFilter);
    }

    async postProduct (body) {
        return await productDao.save(body);
    }

    async putProduct (id, body) {
        await productDao.putUpdate(id, body);
    }

    async deleteProduct (id) {
       await productDao.delete({sku: id});
    }

    async deleteAllProducts () {
        await productDao.deleteAll();
    }

}