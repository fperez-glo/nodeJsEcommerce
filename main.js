const { normalize, schema } = require("normalizr");
const util = require("util");
const dataToNorm = require("./db/mensajes.json");
//Lo pongo momentaneamente para el desafio de webSockets
const moment = require("moment");

const express = require(`express`);
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const port = process.env.PORT || 8080;

//Seteo las rutas del motor de plantillas ejs.
app.set("view engine", "ejs");
app.set("views", "./views");

const products = require("./routes/products/products");
const authForm = require("./routes/auth/auth");
//const chatNormalizr = require('./routes/chat/chat')

//Este midleware inicia una session.
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://developer:developer@ecommerceatlas.js6ut.mongodb.net/ecommerce?retryWrites=true&w=majority",
    }),
    secret: "facuSecret",
    resave: true,
    saveUninitialized: true,
    //Esto no funciona muy bien ya que el servidor toma la hora local que no es la de Argentina.
    cookie: {
        maxAge: 600000, //10 minutos de expiracion de la sesion.
    }
  })
);
//Este midleware te permite recibir el body que se envia como JSON desde POSTMAN por ej.
app.use(express.json());
//Este midleware te permite recibir el body que se envia como POST desde un formulario HTML
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/views"));

//Rutas definidas
app.use("/", authForm);
app.use("/home", products);

//Server compatible para webSockets
const http = require("http");
const server = http.createServer(app);

//Socket
const { Server } = require("socket.io");
const io = new Server(server);

const { chatDao } = require("./daos/index");
const { Mongoose } = require("mongoose");

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

//Conexion con el Socket para el cliente.
io.on("connection", (socket) => {
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
});

const print = (objeto) => {
  const msg = util.inspect(objeto, false, 12, true);
  console.log("msgg:", msg);
};

server.listen(port, () => {
  console.log(`Server run on port ${port}.`);
});
