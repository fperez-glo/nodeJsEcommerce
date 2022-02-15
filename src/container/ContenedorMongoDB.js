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
            cLog.error(`Error al guardar: ${error}`);
            throw new Error(`Error al guardar: ${error}`);
        };
    };

    async put(nuevoElem) {
        try {
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': nuevoElem._id }, nuevoElem);
            if (n == 0 || nModified == 0) {
                cLog.error(`Error al actualizar: no encontrado`);
                throw new Error('Error al actualizar: no encontrado');
            } else {
                return nuevoElem;
            };
        } catch (error) {
            cLog.error(`Error al actualizar: ${error}`);
            throw new Error(`Error al actualizar: ${error}`);
        };
    };

    async delete(element) {
        try {
            const { n, nDeleted } = await this.coleccion.deleteOne(element);
            if (n == 0 || nDeleted == 0) {
                cLog.error(`Error al borrar: no encontrado`);
                throw new Error('Error al borrar: no encontrado');
            }
        } catch (error) {
            cLog.error(`Error al borrar: ${error}`);
            throw new Error(`Error al borrar: ${error}`);
        };
    };

    async deleteAll() {
        try {
            await this.coleccion.deleteMany({});
        } catch (error) {
            cLog.error(`Error al borrar: ${error}`);
            throw new Error(`Error al borrar: ${error}`);
        };
    };

    async insertOne(nuevoElem) {
        try {
            await this.coleccion.insertOne(nuevoElem);
        } catch (error) {
            cLog.error(`Error al guardar: ${error}`);
            throw new Error(`Error al guardar: ${error}`);
        };
    };
};