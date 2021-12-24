const socket = io();

let chatOpened = false
//Tuve que declarar esta variable global porque sino perdia el dato.
let alias, email, nombre, apellido, anios, avatarUrl

//Definiciones de las entidades para normalizar la data del chat
const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'authorId' })
const mensajeSchema = new normalizr.schema.Entity('post', { author: authorSchema }, { idAttribute: 'msgId' })
const mensajesSchema = new normalizr.schema.Entity('posts', { mensajes: [mensajeSchema] }, { idAttribute: 'chatId' })

socket.on("serverProductsResponse", (products)=>{
    
    renderProds(products);
});

const renderProds = (products) => {
    const html = products.map((prod) => {
        //Se arma el bulk para insertar al DOM html
        return `
        <tr>
            <th scope="row" id="prodId"> ${prod.sku} </th>
            <td> ${prod.description} </td>
            <td>$ ${prod.price}</td>
            <td>
            <img src="${prod.thumbnail}" alt="" height="50" width="50" />
            </td>
            <td>
                <button value="${prod.sku}" class='btn' onclick="deleteItem(event)">
                    <img value="${prod.sku}" src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-256.png" alt="" height="20" width="20">
                </button>
            </td>
        </tr>      
        `;
    })
    
    document.querySelector("#tbody").innerHTML = html;
};

const desnormalizr = (messageNormalized) => {
    //Desnormalizo la informacion en memoria para poder pintarla nuevamente en el front. 
    return (normalizr.denormalize(messageNormalized.result, mensajesSchema, messageNormalized.entities).mensajes);
}

socket.on('serverChatResponse', (chats)=>{
    let chatCompresion
    let chatToRender = chats;
    if (chats?.messageNormalized){
        const {messageNormalized} = chats;
        console.log(messageNormalized)
        chatToRender = desnormalizr(messageNormalized);

        console.log('JSON.stringify(messageNormalized).length:',JSON.stringify(messageNormalized).length)
        console.log('JSON.stringify(chatToRender).length:',JSON.stringify(chatToRender).length)
        //Calculo la compresion obtenida.
        chatCompresion = ((JSON.stringify(messageNormalized).length / JSON.stringify(chatToRender).length)*100).toString().substring(0,5);
        console.log('chatCompresion:',chatCompresion)
        console.log('denormalizedChat:',chatToRender)
    };
    
    //renderizo.
    if(chatCompresion) {
        renderCompresion(chatCompresion);
    };

    renderChat(chatToRender);
    
    
});

const renderChat = (chats) => {
    const html = chats.map((chat)=> {
        return `
                <div id='msgLabel'>
                    <p id='userEmail'>${chat.author.alias}</p>
                    <p id='msgDate'>${chat.timeStamp} --> </p>
                    <p id='msg'>${chat.text}</p>
                </div>
            
        `;
    }).join(' ');

    document.querySelector('#chatArea').innerHTML = html;
};

const renderCompresion = (compresion) =>{
    const html =  `
                <div id='compresionLbl'>
                    <p id='compresion'>Compresion del Chat: </p>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${compresion}%;" aria-valuenow=${compresion} aria-valuemin="0" aria-valuemax="100">${compresion}</div>
                    </div>
                </div>
            
        `;

    document.querySelector('#chatCompresion').innerHTML = html;
}


const sendInfo = () => {
    
    const item = {
        sku: document.querySelector("#tt").value,
        price: document.querySelector("#pr").value,
        description: document.querySelector("#td").value,
        thumbnail: document.querySelector("#tb").value,
    };
    
    socket.emit('clietProdSend', item);
    
    //Limpio los inputs del DOM html
    document.querySelector('#tt').value = '';
    document.querySelector('#pr').value = '';
    document.querySelector('#tb').value = '';

    return false;
};

const emptyChatBox = () => { 
    

    socket.emit('clientEmptyChat');
    //No me anduvo esto.. queria que incruste este codigo y renderize el chat.
    
    //document.querySelector("#chatBox") = '';
    chatEmpty = true;
    
};

const deleteItem = (event) => {

    const prodId = event.target['value'] || event.target.parentNode['value'];
    socket.emit('clientDeleteItem', prodId);
};

const sendMsg = () => {

    const message = {
        author: {
            id: email,
            nombre,
            apellido,
            edad: anios,
            alias,
            avatarUrl,
        },
        text: document.getElementById("msgInput").value,
    };

 
    
    socket.emit('userMessage',message);

    document.getElementById("msgInput").value = '';
    
};

const confirmUser = () => {
    //console.log('confirmo el usuario.', event.target.parentNode.parentNode)
    email = document.getElementById('email').value;
    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    anios = document.getElementById('edad').value;
    alias = document.getElementById('usuario').value;
    avatarUrl = document.getElementById('avatar').value;
 
    let html = `<div><b>Usuario Registrado: </b>${alias}</div>`

    document.querySelector('#userInput').innerHTML = html;
    
    html = `<div class="input-group">
                <textarea id="msgInput" placeholder="Mensaje" class="form-control" aria-label="With textarea"></textarea>
                <span onclick="sendMsg()" class="input-group-text" id="basic-addon1"><button class='btn btn-primary'>Enviar</button></span>
            </div>`;

    document.querySelector('#textChatBox').innerHTML = html;

    socket.emit('clientAuth');
    
};

const onChangeText = (value) => {
    console.log('value:', value)
};

if (chatOpened) {
    const textChatBox = document.querySelector('#msg')
    console.log('textChatBox:',textChatBox)
    textChatBox.addEventListener('change',onChangeText(value))
};
