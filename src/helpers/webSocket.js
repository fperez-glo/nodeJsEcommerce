import { print } from './utils.js';
import { chatDao } from "../daos/index.js";
import { normalize, schema } from 'normalizr';
import moment from 'moment';

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


export const socketConnect = (socket) => {
    console.log("Se ha conectado un cliente al Chat");
  
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
      // console.log('Largo sin normalizar:',JSON.stringify(mensajes).length)
  
      //console.log(mensajes)
      const messageNormalize = normalize(mensajes, mensajesSchema);
      print(messageNormalize);
  
      io.sockets.emit("serverChatResponse", chats);
    });
  }