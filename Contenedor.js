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
    } catch (err) {
      throw err;
    }
  }

  async getById(number) {
    const fileRead = await read(`productos.txt`);

    const items = JSON.parse(fileRead);

    items.forEach((item) => {
      if (item.id === number) {
        console.log(`Id ${number} encontrado:`, item);
      }
    });
  }

  async getAll() {
    const fileRead = await read(`productos.txt`);

    const allItems = JSON.parse(fileRead);
    return allItems;
  }

  async deleteById(number) {
    const fileRead = await read(`productos.txt`);

    let items = JSON.parse(fileRead);

    items.forEach((item) => {
      if (item.id === number) {
        const index = items.indexOf(item);
        console.log(`indice:`, index);
        const deletedItem = items.splice(index, 1);
        console.log(`Se borro el item:`, deletedItem);
      }
    });

    await write(`productos.txt`, items)
  };

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
};

module.exports = Contenedor;
