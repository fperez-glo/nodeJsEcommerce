import { chatDao } from "../models/daos/index.js";
import { normalize, schema } from "normalizr";
import moment from "moment";
import { console as cLog } from "./logger.js";
import { ProductService } from "../api/services/products.service.js";

//Definicion de las entidades para normalizar la data del chat
const authorSchema = new schema.Entity("author", {}, { idAttribute: "email" });
const mensajeSchema = new schema.Entity(
  "post",
  { author: authorSchema },
  { idAttribute: "id" }
);
const mensajesSchema = new schema.Entity(
  "posts",
  { mensajes: [mensajeSchema] },
  { idAttribute: "mensajes" }
);

const productService = new ProductService();

export const socketConnect = (io,socket) => {
  cLog.info("Se ha conectado un cliente al Chat");

  //ACA RECIBO EL MENSAJE DESDE LA RUTA "/" DONDE SE ENCUENTRA EL CHAT
  socket.on("userMessage", async (message) => {
    message.timeStamp = moment();
    await chatDao.save(message);
    //Luego de guardar levanto los mensajes para devolverlos por websocket.
    const chats = await chatDao.getAll();

    io.sockets.emit("serverChatResponse", chats);
  });

  //LE ENVIO LA ACCION PARA VACIAR EL CHAT.
  socket.on("clientEmptyChat", async () => {
    await chatDao.deleteAll();

    //Luego de guardar levanto los mensajes para devolverlos por websocket.
    const chats = await chatDao.getAll();

    io.sockets.emit("serverChatResponse", chats);
  });

  //ENVIO LOS MENSAJES GUARDADOS EN LA BASE DE DATOS NI BIEN SE AUTENTICA.
  socket.on("clientAuth", async () => {
    let mensajes = {};
    //Cuando se autentica un usuario le envio los mensajes para pintarlos en pantalla sin tener que enviar un mensaje antes.
    const chats = await chatDao.getAll();

    mensajes = { mensajes: chats, id: "msg" };

    const messageNormalize = normalize(mensajes, mensajesSchema);
    // print(messageNormalize);

    io.sockets.emit("serverChatResponse", chats);
  });

  socket.on('clientDeleteItem', async(prodId) => {
    try {
        await productService.deleteProduct(prodId);
        const getAllProducts = await productService.getAllProds();
        io.sockets.emit('serverProductsResponse',getAllProducts)
    } catch (error) {
      throw {message: error};
    }
    
})
};
