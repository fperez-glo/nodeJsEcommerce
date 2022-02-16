import mongoose from 'mongoose';
import connection from '../database/connections.js';
import { console as cLog } from '../helpers/logger.js';

mongoose.connect(connection.mongodb.connectionString);

export default class ContenedorMongoDB {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async get(id) {
        try {
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 });
            
        } catch (error) {
            cLog.error(`Error al listar por id: ${error}`);
            throw new Error(`Error al listar por id: ${error}`);
        };
    };

    async getAll(searchFilter = {} ) {
        try {
            let docs = await this.coleccion.find(searchFilter, { __v: 0 }).lean();
            return docs;
            
        } catch (error) {
            cLog.error(`Error al listar todo: ${error}`);
            throw new Error(`Error al listar todo: ${error}`);
        };
    };

    async save(nuevoElem) {
        try {  
            await this.coleccion.create(nuevoElem);
            //return doc
        } catch (error) {
            throw `Error al guardar: ${error}`;
        };
    };

    async put(nuevoElem) {
        try {
            await this.coleccion.replaceOne({ '_id': nuevoElem._id }, nuevoElem);
            return nuevoElem;
        } catch (error) {
            throw `Error al actualizar: ${error}`;
        };
    };

    async delete(element) {
        try {
            const { deletedCount } = await this.coleccion.deleteOne(element);
            if (!deletedCount) {
                throw 'Registro no encontrado';
            }
        } catch (error) {
            throw error;
        };
    };

    async deleteAll() {
        try {
            await this.coleccion.deleteMany({});
        } catch (error) {
            throw `Error al borrar: ${error}`;
        };
    };

    async insertOne(nuevoElem) {
        try {
            await this.coleccion.insertOne(nuevoElem);
        } catch (error) {
            throw `Error al guardar: ${error}`;
        };
    };
};