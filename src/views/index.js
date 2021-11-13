const socket = io();
console.log('hola desde index js')
//Tuve que declarar esta variable global porque sino perdia el dato.
let user
//-----


//PRODUCTOS
socket.on("serverProductsResponse", (products)=>{
    
    renderProds(products);
});

const renderProds = (products) => {
    const html = products.map((prod) => {
        //Se arma el bulk para insertar al DOM html
        return `
        <tr>
            <th scope="row" id="prodId"> ${prod.id} </th>
            <td> ${prod.title} </td>
            <td>$ ${prod.price}</td>
            <td>
            <img src="${prod.thumbnail}" alt="" height="50" width="50" />
            </td>
            <td>
                <button value="${prod.id}" class='btn' onclick="deleteItem(event)">
                    <img value="${prod.id}" src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-256.png" alt="" height="20" width="20">
                </button>
            </td>
        </tr>      
        `;
    })
    
    document.querySelector("#tbody").innerHTML = html;
};


//CHAT
socket.on('serverChatResponse', (chats)=>{
    renderChat(chats);
});

const renderChat = (chats) => {
    const html = chats.map((chat)=> {
        return `
                <div id='msgLabel'>
                    <p id='userEmail'>${chat.email}</p>
                    <p id='msgDate'>${chat.datetime} --> </p>
                    <p id='msg'>${chat.msg}</p>
                </div>
            
        `;
    }).join(' ');

    document.querySelector('#chatArea').innerHTML = html;
};


const sendInfo = () => {
    
    const item = {
        title: document.querySelector("#tt").value,
        price: document.querySelector("#pr").value,
        thumbnail: document.querySelector("#tb").value,
    };
    
    socket.emit('clietProdSend', item);
    
    //Limpio los inputs del DOM html
    document.querySelector('#tt').value = '';
    document.querySelector('#pr').value = '';
    document.querySelector('#tb').value = '';

    return false;
};

//Abro el chat box
const openChatBox = () => { 
    console.log('Abro el chat')
    
    if (chatOpened) {
        console.log('Cierro el chat')
    };

    //No me anduvo esto.. queria que incruste este codigo y renderize el chat.
    const html =  `<%- include('templates/chat')  %>`
    document.querySelector("#chatBox").innerHTML = html;
    chatOpened = true;

};

const deleteItem = (event) => {
    const prodId = event.target['value'] || event.target.parentNode['value'];
    
    socket.emit('clientDeleteItem', prodId);
};

const sendMsg = () => {
    const message = {
        email: user,
        msg: document.getElementById("msgInput").value,
    };
    
    socket.emit('userMessage',message);

    document.getElementById("msgInput").value = '';
};

const confirmUser = () => {
    //console.log('confirmo el usuario.', event.target.parentNode.parentNode)
    user = document.getElementById('user').value

    let html = `<div><b>Usuario Registrado: </b>${user}</div>`

    document.querySelector('#userInput').innerHTML = html;
    
    html = `<div class="input-group">
                <textarea id="msgInput" placeholder="Mensaje" class="form-control" aria-label="With textarea"></textarea>
                <span onclick="sendMsg()" class="input-group-text" id="basic-addon1"><button class='btn btn-primary'>Enviar</button></span>
            </div>`;

    document.querySelector('#textChatBox').innerHTML = html;
    
};

const onChangeText = (value) => {
    console.log('value:', value)
};
