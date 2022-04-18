import { app } from "../../main.js";
import request from "supertest";
import { expect, assert } from "chai";
import { ProductService } from "../api/services/products.service.js";

const prodService = new ProductService();

describe("API Productos - /products", () => {
  it("Devuelve todos los productos disponibles del ecommerce", async () => {
    const products = await request(app).get("/products/getAllProduct");
    expect(products.status).to.eql(201);
  });

  it("Agrega un producto a la coleccion", async () => {
    await request(app).post("/products").send({
      sku: "GGAS662",
      title: "TEST",
      description: "producto para test",
      price: 5555,
      thumbnail: "sin foto",
      stock: 6,
    });

    const searchProd = await prodService.getAllProds({
      sku: "GGAS662",
    });

    expect(searchProd[0].sku).to.eql('GGAS662');
  });

  it("Actualiza un producto a la coleccion", async () => {
    await request(app).put("/products/GGAS662").send({
      title: "TEST_actualizado",
    });

    const searchProd = await prodService.getAllProds({
      title: "TEST_actualizado",
    });

    expect(searchProd[0].title).to.eql("TEST_actualizado");
  });

  it("Borra un producto a la coleccion", async () => {
    const response = await request(app).delete("/products/GGAS662");
    expect(response.status).to.eql(203);
  });
});
