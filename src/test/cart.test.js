import { app } from "../../main.js";
import request from "supertest";
import { expect, assert } from "chai";
import { CartService } from "../api/services/cart.service.js";

const cartService = new CartService();

describe('API Carrito - /cart', ()=> {

    it('Genera un carrito', async ()=> {
        const response = await request(app).post('/cart')
        .send({userId: '6216c920faebd6591fb4f820'});
        expect(response.status).to.eql(201);
    })

    

    it('Añade productos al carrito', async ()=> {
        await request(app)
            .post('/cart/addProduct')
            .send({prodId: 'MONGODB', userId: '6216c920faebd6591fb4f820'})
        const userCart = await cartService.getUserCart({userId: '6216c920faebd6591fb4f820'});
        const selectCartProds = await cartService.getCartProducts(userCart[0].cartId)
        
        expect(selectCartProds[0].sku).to.eql('MONGODB');
        
    })

    it('Devuelve los productos de algun carrito', async ()=> {
        const userCart = await cartService.getUserCart({userId: '6216c920faebd6591fb4f820'}); 
        const response = await request(app).get(`/cart/${userCart[0].cartId}/productos`);
        expect(response.body.cartProducts.length).to.eql(1);
    })

    it('Elimina productos del carrito', async ()=> {
        try {
            const userCart = await cartService.getUserCart({userId: '6216c920faebd6591fb4f820'}); 
            await request(app)
                .delete(`/cart/${userCart[0].cartId}/productos/MONGODB`)
            const selectCartProds = await cartService.getCartProducts(userCart[0].cartId)
            console.log('selectcarProd', selectCartProds)
            expect(selectCartProds[0]?.sku).not.eql('MONGODB');    
        } catch (error) {
            expect(error).to.eql('No se encontraron productos en el carrito.')
        }
        
    })

    it('Elimina el carrito', async ()=> {
        const userCart = await cartService.getUserCart({userId: '6216c920faebd6591fb4f820'});
        await request(app)
            .delete(`/cart/${userCart[0].cartId}`)
        const checkDeletedCart = await cartService.getUserCart({userId: '6216c920faebd6591fb4f820'});
        expect(checkDeletedCart.length).to.eql(0);
    })
})
