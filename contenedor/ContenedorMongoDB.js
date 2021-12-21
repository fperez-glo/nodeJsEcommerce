const mongoose = require('mongoose');
const { mongodb } = require('../connections');

mongoose.connect(mongodb.connectionString);


class ContenedorMongoDB {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async get(id) {
        try {
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 })
            
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async getAll() {
        try {
            let docs = await this.coleccion.find({}, { __v: 0 }).lean()
          
            return docs
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save(nuevoElem) {
        try {  
            await this.coleccion.create(nuevoElem);
            //return doc
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async put(nuevoElem) {
        try {
            
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': nuevoElem._id }, nuevoElem)
            if (n == 0 || nModified == 0) {
                throw new Error('Error al actualizar: no encontrado')
            } else {
                
                return nuevoElem
            }
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async delete(id) {
        try {
            const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id })
            if (n == 0 || nDeleted == 0) {
                throw new Error('Error al borrar: no encontrado')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await this.coleccion.deleteMany({})
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}

module.exports = ContenedorMongoDB;