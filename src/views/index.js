const socket = io();

let chatOpened = false
//Tuve que declarar esta variable global porque sino perdia el dato.
let alias, email, nombre, apellido, anios, avatarUrl


const sendAuthInfo = async () => {

    const user = document.querySelector("#userParam").value;
    const password = document.querySelector("#pswParam").value;

    //no me funka esto.. lo mando directo del form html y fue..
    const myRequest = new Request('http://localhost:8080/auth/authLogIn', {method: 'POST', body: 'ASDASDASDS' });
    //await fetch(myRequest);
    
    return false;
}

// const logOutUser = () => {
//     console.log('desloguear!!!')
// }





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
                    <p id='userEmail'>${chat.author.alias}</p>
                    <p id='msgDate'>${chat.timeStamp} --> </p>
                    <p id='msg'>${chat.text}</p>
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

const deleteButton = document.getElementById("deleteButton");
console.log('deleteButton:',deleteButton)
if (deleteButton){
    
    deleteButton.addEventListener('click', deleteItem)
}
const deleteItem = (event) => {
    console.log('event.target:', event.target)
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


if (chatOpened) {
    const textChatBox = document.querySelector('#msg')
    textChatBox.addEventListener('change',onChangeText(value))
};
