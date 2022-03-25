import graphQlService from '../services/graphql.service.js';

export const graphQlRoot = {
    //PRODUCTOS
    getAllProducts: async() => {
       return await graphQlService.getAllProducts();
    },
    getProduct: async({id}) => {
        return await graphQlService.getProduct({id});
    },
    postProduct: async(prod) => {
        return await graphQlService.postProduct(prod);
    },
    putProduct: async(prod) => {
        return await graphQlService.putProduct(prod);
    },
    deleteProduct: async({sku}) => {
        return await graphQlService.deleteProduct({sku});
    },
    deleteAllProducts: async() => {
        return await graphQlService.deleteAllProducts();
    },

    //CARRITO
    getCartProducts: async(cartId) => {
        return await graphQlService.getCartProducts(cartId)
    },
    getAllCarts: async() => {
        return await graphQlService.getAllCarts();
    },
    postGenerateCart: async({userId}) => {
        await graphQlService.postGenerateCart(userId);
        return {message: `Carrito generado con exito para el usuario ${userId}`}
    },
    deleteCart: async({cartId}) => {
        await graphQlService.deleteCart(cartId);
        return {message: `Carrito ${cartId} eliminado con exito`}
    },
    deleteCartProduct: async({cartId, prodId}) => {
        await graphQlService.deleteCartProduct(cartId, prodId);
        return {message: `Producto ${prodId} removido del carrito ${cartId}`}
    },
    addCartProduct: async({prodId, userId}) => {
        const response = await graphQlService.addCartProduct(prodId, userId);
        console.log('response:', response)
        return  response[0]//{message: `Producto ${prodId} agregado al carrito del usuario ${userId}`, response}
    }

}