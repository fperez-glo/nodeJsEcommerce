const socket = io();

socket.on("message", (data)=>{
    console.log('mensaje del servidor: ',data)

    socket.emit("clientResponse","Gracias por la conexion, señor servidor")
    
});