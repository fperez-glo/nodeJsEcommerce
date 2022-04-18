const socket = io();

let chatOpened = false
//Tuve que declarar esta variable global porque sino perdia el dato.
let alias, email, nombre, apellido, anios, avatarUrl

socket.on("serverProductsResponse", (products)=>{
    
    renderProds(products);
});

const renderProds = (products) => {
    const html = products.map((prod) => {
        //Se arma el bulk para insertar al DOM html
        return `
        <tr>
          <th scope="row" id="prodId">${prod.sku}</th>
          <td>${prod.description}</td>
          <td>$${prod.price}</td>
          <td>
            <img src="${prod.thumbnail}" alt="" height="50" width="50" />
          </td>
          <td>
            <button class="btn" type="submit" value="${prod.sku}" name="prodId">
              <div id="cartIcon">
                <img
                src="https://cdn0.iconfinder.com/data/icons/medical-1-2/48/47-512.png"
                alt=""
                height="15"
                width="15"
              />
                <img
                src="https://cdn1.iconfinder.com/data/icons/shopping-e-commerce-10/33/cart-512.png"
                height="25"
                width="25"
              />
              </div>
              
            </button>
          </td>
          <td>
            <button id="deleteButton" type="button" class="btn deleteBtn" value="${prod.sku}" name="prodId">
              <img
              src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-256.png"
              height="22"
              width="22"
            />
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

const emptyChatBox = () => { 
    

    socket.emit('clientEmptyChat');
    //No me anduvo esto.. queria que incruste este codigo y renderize el chat.
    
    //document.querySelector("#chatBox") = '';
    chatEmpty = true;
    
};


// Delete products
const deleteItem = (event) => {
  
    const prodId = event.target['value'] || event.target.parentNode['value'];
    console.log("entra en delete item??", prodId)
    socket.emit('clientDeleteItem', prodId);
};
const deleteButtons = document.querySelectorAll(".deleteBtn");

Array.prototype.forEach.call(deleteButtons, function addClickListener(btn) {
  btn.addEventListener('click', deleteItem);
});

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
