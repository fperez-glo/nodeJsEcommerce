import express from "express";

import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

//Construimos el Graphql Schema

//tipo Query son solo para consultas
//tipo Mutation son para eliminar, agregar, actualizar, etc...
const graphQLschema = buildSchema(`
  type Cliente {
      id: Int,
      nombre: String,
      telefono: String
  }

  type Producto {
    sku: String,
    title: String,
    description: String,
    price: Int,
    thubmnail: String,
    stock: Int
  }

  type Carrito {
    products: Producto,
    userId: String,
    timeStamp: String,
  }

  type Query {
    productos: [Producto]
    carritos: [Carrito]
    producto(id: String): Producto
    prodsCarritos(id: Int): Carrito
  }

  type Mutation {
    addClient(nombre: String, telefono: String): Cliente
  }

`);

const clientes = [];
let counter = 1;
const productos = [{sku: '1', price:3332}, {sku: '2'}, {sku: 'asda'}, {sku: 'asdass112'}]

// Generalmente los metodos del schema de graphql se guardan en una 
// variable llamada root.
const root = {
  productos: () => {
    return  productos;
  },

  producto: ({id}) => {
    let product
    productos.forEach(prod => {
      if (prod.sku == id) {
        product = prod;
      };
    })

    return product || null;
  },

  addClient: (data) => {
    const object = {
      id: counter,
      nombre: data.nombre,
      telefono: data.telefono,
    };

    clientes.push(object);
    counter++;
    return object;

  },
};

const app = express();

//Midleware de graphql
app.use('/graphql', graphqlHTTP({
    schema: graphQLschema,
    rootValue: root,
}))

app.listen(4000, () => {
  console.log("Server ok in port 4000!");
});
