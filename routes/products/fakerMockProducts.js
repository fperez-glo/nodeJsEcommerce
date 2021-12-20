const express = require(`express`);
const { Router } = express;
const fs = require('fs');
const faker = require('faker')

const router = new Router();

const getMockProducts = (qty) => {
    let mockProducts = []
    
    for (let i = 0; i < (qty ?? 5) ; i++) {
        mockProducts.push({
            sku: faker.datatype.uuid(),
            description: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.food(),
        })
        };

        return mockProducts;
    };


/** Devuelve todos los productos mock para pruebas */
router.get('/',
async (req, res) => {
    const { qty } = req.query
    const mockProducts = getMockProducts(qty);
    // const products = await itemContainer.getAll();
    res.render('mockProductsTable',{ products: mockProducts });
    //res.send({mockProducts})
});


module.exports = router;