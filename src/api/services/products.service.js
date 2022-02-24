import { productDao } from "../../daos/index.js";

export class ProductService {

    async getAllProduct () {
        return await productDao.getAll();
    }

    async postProduct (body) {
        return await productDao.save(body);
    }

    async putProduct (id, body) {
        await productDao.updateItem(id, body);
    }

    async deleteProduct (id) {
       await productDao.delete({sku: id});
    }

    async deleteAllProducts () {
        await productDao.deleteAll();
    }

}