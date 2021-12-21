const admin = require ("firebase-admin");
const { firebaseConn } = require('../connections');

admin.initializeApp({
    credential: admin.credential.cert(firebaseConn)
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(colection) {
        this.coleccion = db.collection(colection)
    }

    async get(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                throw new Error(`Error al listar por id: no se encontró`)
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async getAll() {
        try {
            // text: 'Buenas',
            // author: {
            //     edad: '22',
            //     nombre: 'Facundo Nahuel',
            //     avatarUrl: 'asda',
            //     alias: 'FIREBASE!',
            //     id: 'facundoperez6@gmail.com',
            //     apellido: 'Pandolfo'
            // },
            // timeStamp: Timestamp { _seconds: 1640044335, _nanoseconds: 420000000 }
            const result = []
            const getData = await this.coleccion.get();
            getData.forEach(doc => {
        
                result.push({   
                                id: doc.id,
                                text: doc.data().text,
                                author: doc.data().author,
                                timeStamp: doc.data().timeStamp.toDate() 
                            })
            })
          
            return result
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save(nuevoElem) {
        try {
            const guardado = await this.coleccion.add(nuevoElem);
            return { ...nuevoElem, id: guardado.id }
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async put(nuevoElem) {
        try {
            const actualizado = await this.coleccion.doc(nuevoElem.id).set(nuevoElem);
            return actualizado
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async delete(id) {
        try {
            const item = await this.coleccion.doc(id).delete();
            return item
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        // version fea e ineficiente pero entendible para empezar
        try {
            const docs = await this.getAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.delete(id))
            const resultados = await Promise.allSettled(promesas)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                throw new Error('no se borró todo. volver a intentarlo')
            }
            // const ref = firestore.collection(path)
            // ref.onSnapshot((snapshot) => {
            //     snapshot.docs.forEach((doc) => {
            //         ref.doc(doc.id).delete()
            //     })
            // })
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}

module.exports = ContenedorFirebase;