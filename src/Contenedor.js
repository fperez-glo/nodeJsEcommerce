const fs = require("fs");

const read = async (file) => {
  const read = await fs.promises.readFile(`./${file}`, `utf-8`);
  return read;
};

const write = async (file, items) => {
  await fs.promises.writeFile(
    `./${file}`,
    JSON.stringify(items, null, 2) + `\n`
  );
};

class Contenedor {
  constructor(fileName) {
    this.products = [];
  }

  async save(item) {
    try {
      //fs.appendFile(`./${this.fileName}`,`"${item.id}":`+JSON.stringify(item, null, 2)+`,\n`, (err)=>{
      const fileRead = await read(`productos.txt`);

      if (fileRead.length) {
        const items = JSON.parse(fileRead);
        item.id = items.length + 1;
        items.push(item);
        this.products = items;
        await write(`productos.txt`, this.products);
      } else {
        item.id = 1;
        this.products.push(item);
        await write(`productos.txt`, this.products);
      }
      return item;
    } catch (err) {
      throw err;
    }
  }

  async getById(number) {
    let element
    const fileRead = await read(`productos.txt`);

    const items = JSON.parse(fileRead);

    items.forEach((item) => {
      if (item.id === parseInt(number)) {
        element = item;
      }
    });

    return element;
  }

  async getAll() {
    const fileRead = await read(`productos.txt`);

    const allItems = JSON.parse(fileRead);
    return allItems;
  }

  

  async deleteAll() {
      const fileRead = await read(`productos.txt`);
      //Reviso si existe o almenos hay contenido en el archivo.
      if (fileRead.length){
        //parseo a objeto y reviso que tenga o no objetos en el array
        let items = JSON.parse(fileRead);
        if (items.length){
          items.length = 0;
          await write(`productos.txt`, items)
          console.log(`Se eliminaron todos los items.`);
          return
        };
        
        console.log(`No existen items para eliminar.`)
        
      };
  };

  async updateItem(id, params) {
    let finded = false;
    const fileRead = await read(`productos.txt`);
    //Reviso si existe o almenos hay contenido en el archivo.
    if (fileRead.length){
      //parseo a objeto y reviso que tenga o no objetos en el array
      let items = JSON.parse(fileRead);
      items.forEach((item)=>{
        if (item.id === parseInt(id)){
          const { title, price, thumbnail } = params;
          const index = items.indexOf(item);
          //Le asigno directamente params que contiene el body enviado a la api { title, price, thumbnail }.
          items[index] =  { title, price, thumbnail, id};
          finded = true
        };
      });

      if (!finded){
        //Con este throw, saldria de la ejecucion
        throw `No se encontro el producto con id: ${id}`
      };

      await write(`productos.txt`, items);

    } else {
      throw 'No se encontraron productos.'
    };
  };

  async deleteById(id) {
    id=parseInt(id);
    
    let finded = false;
    const fileRead = await read(`productos.txt`);

    let items = JSON.parse(fileRead);
    
    items.forEach((item) => {
      if (item.id === id) {
        const index = items.indexOf(item);
        const deletedItem = items.splice(index, 1);
        console.log('deletedItem: ',items)
        finded= true;
        
      };
    });
    
    if (!finded) {
      //Con este throw, saldria de la ejecucion
      throw `No se encontro el producto con id: ${id}`
    };

    await write(`productos.txt`, items)
    return items;
  };

};

module.exports = Contenedor;
