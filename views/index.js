const socket = io();

let chatOpened = false
//Tuve que declarar esta variable global porque sino perdia el dato.
let user
//-----

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
    console.log(event.target)
    const prodId = event.target['value'] || event.target.parentNode['value'];
    socket.emit('clientDeleteItem', prodId);
};

const sendMsg = () => {
    console.log('mensaje:',document.getElementById("msgInput").value)
    
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
