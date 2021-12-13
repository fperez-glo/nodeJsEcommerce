import fs from 'fs';

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

export default class clsProducts {
  constructor() {
    this.products = [];
  }

  async save(item) {
    try {
      //const { title, description, sku, thumbnail, price, stock } = item;
      const fileRead = await read(`productos.json`);

      if (fileRead.length) {
        const items = JSON.parse(fileRead);

        const findProd = items.filter(el => el.sku.toUpperCase() === item.sku.toUpperCase());
        
        if (findProd.length){
          throw `El producto ${item.sku} ya existe.`
        };

        items.push(item);
        this.products = items;
        await write(`productos.json`, this.products);
      } else {
        this.products.push(item);
        await write(`productos.json`, this.products);
      }
      return item;
    } catch (err) {
      throw err;
    }
  }

  async getById(sku) {
    let element
    const fileRead = await read(`productos.json`);

    const items = JSON.parse(fileRead);

    items.forEach((item) => {
      if (item.sku === sku) {
        element = item;
      }
    });
    
    if (!element){
      throw `Producto no encontrado.`
    };

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
        
        if (item.sku.toUpperCase() === id.toUpperCase()){
          const { title, description, thumbnail, price, stock } = params;
          const index = items.indexOf(item);
          //Le asigno directamente params que contiene el body enviado a la api { title, price, thumbnail }.
          //items[index] =  { title, price, thumbnail, id};
          items[index] =  { title, description, sku: id, thumbnail, price, stock };
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
    let finded = false;
    const fileRead = await read(`productos.json`);
    console.log('id:',id)
    let items = JSON.parse(fileRead);
    
    items.forEach((item) => {
      if (item.sku.toUpperCase() === id.toUpperCase()) {
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
