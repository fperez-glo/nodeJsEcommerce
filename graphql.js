import express from "express";

import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

//Construimos el Graphql Schema

//tipo Query son solo para consultas
//tipo Mutation son para eliminar, agregar, actualizar, etc...
const schema = buildSchema(`
    type Cliente {
        id: Int,
        nombre: String,
        telefono: String
    }

    type Query {
        clientes: [Cliente]
        cliente(id: Int): Cliente
    }

    type Mutation {
        addClient(nombre: String, telefono: String): Cliente
    }

`);

const clientes = [];
let counter = 1;


// Generalmente los metodos del schema de graphql se guardan en una 
// variable llamada root.
const root = {
  clientes: () => {
    return clientes;
  },

  cliente: (data) => {
    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].id == data.id) return clientes[1];
    }

    return null;
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
    schema,
    rootValue: root,
}))

app.listen(4000, () => {
  console.log("Server ok in port 4000!");
});
