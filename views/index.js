const socket = io();

let chatOpened = false

socket.on("serverResponse", (products)=>{
    
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

const openChatBox = () => { 
    console.log('Abro el chat')
    
    if (chatOpened) {
        console.log('Cierro el chat')
    };



};

const deleteItem = (event) => {
    const prodId = event.target['value'] || event.target.parentNode['value'];
    socket.emit('clientDeleteItem', prodId);
};