const { normalize, schema } = require('normalizr')
const util = require('util')
const dataToNorm = require('./db/mensajes.json')
//Lo pongo momentaneamente para el desafio de webSockets
const moment = require('moment');

const express = require(`express`);


const app = express();
const port = process.env.PORT || 8080;



//Seteo las rutas del motor de plantillas ejs.
app.set('view engine', 'ejs');
app.set('views', './views');


const prodMockTest = require('./routes/products/fakerMockProducts')
const chatNormalizr = require('./routes/chat/chat')

//Este midleware te permite recibir el body que se envia como JSON desde POSTMAN por ej.
app.use(express.json());
//Este midleware te permite recibir el body que se envia como POST desde un formulario HTML
app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname+'/views'))

//Rutas definidas
app.use('/',chatNormalizr);
app.use('/api/productos-test', prodMockTest)


//Server compatible para webSockets
const http = require('http');
const server = http.createServer(app);

//Socket
const { Server } = require('socket.io');
const io = new Server(server);

const { chatDao } = require('./daos/index')

//Definicion de las entidades para normalizar la data del chat
const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' })
const mensajeSchema = new schema.Entity('post', { author: authorSchema }, { idAttribute: 'id' })
const mensajesSchema = new schema.Entity('posts', { mensajes: [mensajeSchema] }, { idAttribute: 'mensajes' })

//Conexion con el Socket para el cliente.
io.on("connection", ( socket )=> {
    
    console.log('Se ha conectado un cliente al Chat')

    //ACA RECIBO EL MENSAJE DESDE LA RUTA "/" DONDE SE ENCUENTRA EL CHAT
    socket.on('userMessage', async(message) => {
        message.timeStamp = moment();
        await chatDao.save(message)
        //Luego de guardar levanto los mensajes para devolverlos por websocket.
        const chats = await chatDao.getAll();

        io.sockets.emit('serverChatResponse',chats);
        
    });

    //LE ENVIO LA ACCION PARA VACIAR EL CHAT.
    socket.on('clientEmptyChat',async() => {
        
        await chatDao.deleteAll()
        
        //Luego de guardar levanto los mensajes para devolverlos por websocket.
        const chats = await chatDao.getAll();

        io.sockets.emit('serverChatResponse',chats);
        
    });


    //ENVIO LOS MENSAJES GUARDADOS EN LA BASE DE DATOS NI BIEN SE AUTENTICA.
    socket.on('clientAuth',async() => {
        let mensajes = {}
        //Cuando se autentica un usuario le envio los mensajes para pintarlos en pantalla sin tener que enviar un mensaje antes.
        const chats = await chatDao.getAll();

        //FIXME: NO SE SI ESTO ESTA BIEN.. PERO LO ARME PARA USARLO CON NORMALIZR CON EL FORMATO QUE ENTENDI QUE IBA...
        mensajes = {mensajes: chats, id: 'mensajes'}
        

        //FIXME: NO ENTIENDO COMO relacionar los datos.. Y NO ME QUEDA MAS TIEMPO PARA EL DESAFIO.... (LLORAR)
        // const authorSchema = new schema.Entity('author');
        // const messagesSchema = new schema.Entity('text');
        // const messagesSchema = new schema.Entity('text',{
        //     mensajes: authorSchema
        // })

        // const chatSchema = new schema.Entity('chat',{
        //     author: authorSchema,
        //     mensajes: messagesSchema
        // })
        
        // const messageSchema = new schema.Entity('text',{
        //     author: userSchema,
           
        // })
        // console.log('mensajes:',mensajes)
        const messageNormalize = normalize(mensajes, mensajesSchema)
        print(messageNormalize);

        io.sockets.emit('serverChatResponse',chats);
        
    });
    
});

const print = (objeto) => {
    const msg = util.inspect(objeto, false, 12, true)
    console.log('msgg:',msg)
}


server.listen(port, ()=>{
    console.log(`Server run on port ${port}.`)
});