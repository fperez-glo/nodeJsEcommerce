const fs = require('fs');

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = `${ruta}`;
    }

    async get(id) {
        const objs = await this.getAll()
        const buscado = objs.find(o => o.id == id)
        return buscado
    }

    async getAll() {
        try {
            const objs = await fs.promises.readFile(this.ruta, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async save(obj) {
        const objs = await this.getAll()

        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }

        const newObj = { ...obj, id: newId }
        objs.push(newObj)

        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newObj
        } catch (error) {
            throw new Error(`Error al guardar 'save': ${error}`)
        }
    }

    async put(elem) {
        const objs = await this.getAll()
        const index = objs.findIndex(o => o.id == elem.id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            objs[index] = elem
            try {
                await fs.promises.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error al actualizar 'put': ${error}`)
            }
        }
    }

    async delete(id) {
        const objs = await this.getAll()
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error al eliminar: no se encontró el id ${id}`)
        }

        objs.splice(index, 1)
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Error al eliminar 'delete': ${error}`)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al eliminar 'deleteAll': ${error}`)
        }
    }
}


module.exports = ContenedorArchivo;