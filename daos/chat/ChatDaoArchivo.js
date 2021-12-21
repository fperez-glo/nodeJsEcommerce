const ContenedorArchivo = require("../../contenedor/ContenedorArchivo")

class ChatDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('./DB/chat.json')
    }
}

module.exports = ChatDaoArchivo;