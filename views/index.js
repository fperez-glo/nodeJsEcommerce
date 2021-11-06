const socket = io();

socket.on("serverResponse", (products)=>{
    
    renderProds(products);
});

const renderProds = (products) => {
    const html = products.map((prod) => {
        return `
        <tr>
            <th scope="row" id="prodId"> ${prod.id} </th>
            <td> ${prod.title} </td>
            <td>$ ${prod.price}</td>
            <td>
            <img src="${prod.thumbnail}" alt="" height="50" width="50" />
            </td>
            <td><button class='btn' ><img src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-256.png" alt="" height="20" width="20"></button></td>
        </tr>      
        `;
    })
    .join(' ')

    document.querySelector("#tbody").innerHTML = html;
};


const sendInfo = () => {
    
    const item = {
        title: document.querySelector("#tt").value,
        price: document.querySelector("#pr").value,
        thumbnail: document.querySelector("#tb").value,
    };
    console.log('entra en sendinfo', item)
    
    socket.emit('clietProdSend', item);

    document.querySelector('#tt').value = '';
    document.querySelector('#pr').value = '';
    document.querySelector('#tb').value = '';

    return false;
};


const deleteItem = () => {
    //FIXME: NO PUDE TODAVIA MIRAR ESTO.. ME DEVUELVE EL MISMO ID = 1 EN CUALQUIER FILA QUE HAGA CLICK.
    const prodId = document.querySelector('#prodId');
    console.log('borro el item: ',prodId)

};