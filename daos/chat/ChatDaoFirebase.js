const ContenedorFirebase = require("../../contenedor/ContenedorFirebase");

class ChatDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('mensajes')
    }
}

module.exports = ChatDaoFirebase;
