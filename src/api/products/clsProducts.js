const fs = require("fs");

const read = async (file) => {
  const read = await fs.promises.readFile(`./src/${file}`, `utf-8`);
  return read;
};

const write = async (file, items) => {
  await fs.promises.writeFile(
    `./src/${file}`,
    JSON.stringify(items, null, 2) + `\n`
  );
};

module.exports = class clsProducts {
  constructor() {
    this.products = [];
  }

  async save(item) {
    try {
      
      const fileRead = await read(`productos.json`);

      if (fileRead.length) {
        const items = JSON.parse(fileRead);
        item.id = items.length + 1;
        items.push(item);
        this.products = items;
        await write(`productos.json`, this.products);
      } else {
        item.id = 1;
        this.products.push(item);
        await write(`productos.json`, this.products);
      }
      return item;
    } catch (err) {
      throw err;
    }
  }

  async getById(number) {
    let element
    const fileRead = await read(`productos.json`);

    const items = JSON.parse(fileRead);

    items.forEach((item) => {
      if (item.id === parseInt(number)) {
        element = item;
      }
    });

    return element;
  }

  async getAll() {
    const fileRead = await read(`productos.json`);

    const allItems = JSON.parse(fileRead);
    return allItems;
  }

  

  async deleteAll() {
      const fileRead = await read(`productos.json`);
      //Reviso si existe o almenos hay contenido en el archivo.
      if (fileRead.length){
        //parseo a objeto y reviso que tenga o no objetos en el array
        let items = JSON.parse(fileRead);
        if (items.length){
          items.length = 0;
          await write(`productos.json`, items)
          console.log(`Se eliminaron todos los items.`);
          return
        };
        
        console.log(`No existen items para eliminar.`)
        
      };
  };

  async updateItem(id, params) {
    let finded = false;
    const fileRead = await read(`productos.json`);
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

      await write(`productos.json`, items);

    } else {
      throw 'No se encontraron productos.'
    };
  };

  async deleteById(id) {
    id=parseInt(id);
    
    let finded = false;
    const fileRead = await read(`productos.json`);

    let items = JSON.parse(fileRead);
    
    items.forEach((item) => {
      if (item.id === id) {
        const index = items.indexOf(item);
        const deletedItem = items.splice(index, 1);
        finded= true;
        
      };
    });
    
    if (!finded) {
      //Con este throw, saldria de la ejecucion
      throw `No se encontro el producto con id: ${id}`
    };

    await write(`productos.json`, items)
    return items;
  };

};

