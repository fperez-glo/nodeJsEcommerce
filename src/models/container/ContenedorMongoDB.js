import mongoose from "mongoose";
import connection from "../config/connection.js";
import { console as cLog, fileErr as fLog } from "../../helpers/logger.js";

mongoose.connect(connection.mongodb.connectionString);

let instance = null;

export default class ContenedorMongoDB {
  constructor(esquema, nombreColeccion) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
    this.instanceId = Math.random(200);
  }

  static getInstance() {
    if (!instance) {
      instance = new ContenedorMongoDB();
    }

    return instance;
  }

  async get(id) {
    try {
      const docs = await this.coleccion.find({ _id: id }, { __v: 0 });
    } catch (error) {
      cLog.error(`Error al listar por id: ${error}, Metodo get`);
      fLog.error(`Error al listar por id: ${error}, Metodo get`);
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

  async getAll(searchFilter = {}) {
    try {
      let docs = await this.coleccion.find(searchFilter, { __v: 0 }).lean();
      return docs;
    } catch (error) {
      cLog.error(`Error al listar todo: ${error}, Metodo getAll`);
      fLog.error(`Error al listar todo: ${error}, Metodo getAll`);
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async save(nuevoElem) {
    try {
      await this.coleccion.create(nuevoElem);
      //return doc
    } catch (error) {
      cLog.error(`Error al guardar: ${error}, Metodo save`);
      fLog.error(`Error al guardar: ${error}, Metodo save`);
      throw `Error al guardar: ${error}`;
    }
  }

  async put(nuevoElem) {
    try {
      await this.coleccion.replaceOne({ _id: nuevoElem._id }, nuevoElem);
      return nuevoElem;
    } catch (error) {
      cLog.error(`Error al reemplazar: ${error}, Metodo put`);
      fLog.error(`Error al reemplazar: ${error}, Metodo put`);
      throw `Error al reemplazar: ${error}`;
    }
  }

  async putUpdate(id, body) {
    try {
      if (this.coleccion == "productos") {
        await this.coleccion.updateOne({ sku: id }, body);
      } else {
        await this.coleccion.updateOne({ _id: id }, body);
      }
     
    } catch (error) {
      cLog.error(`Error al actualizar: ${error}, Metodo putUpdate`);
      fLog.error(`Error al actualizar: ${error}, Metodo putUpdate`);
      throw `Error al actualizar: ${error}`;
    }
  }

  async delete(element) {
    try {
      const { deletedCount } = await this.coleccion.deleteOne(element);
      if (!deletedCount) {
        cLog.error(`Registro no encontrado, Metodo delete`);
        fLog.error(`Registro no encontrado, Metodo delete`);
        throw "Registro no encontrado";
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      await this.coleccion.deleteMany({});
    } catch (error) {
      cLog.error(`Error al borrar: ${error}, Metodo deleteAll`);
      fLog.error(`Error al borrar: ${error}, Metodo deleteAll`);
      throw `Error al borrar: ${error}`;
    }
  }

  async insertOne(nuevoElem) {
    try {
      await this.coleccion.insertOne(nuevoElem);
    } catch (error) {
      cLog.error(`Error al guardar: ${error}, Metodo insertOne`);
      fLog.error(`Error al guardar: ${error}, Metodo insertOne`);
      throw `Error al guardar: ${error}`;
    }
  }
}
