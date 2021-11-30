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

class clsProducts {
  constructor(knex) {
    this.products = [],
    this.table = 'productos',
    this.knex = knex
  }

  async save(item) {
    try {
      await this.knex(this.table).insert(item);
      
      return item;
    } catch (err) {
      throw err;
    }
  }

  async getById(id) {
    
    const select = await this.knex.from(this.table).where({sku: id})

    if (select.length) {
      const element = JSON.parse(JSON.stringify(select))[0]
      return element;
    } else {
      throw `El producto ${id} no existe.`
    };
  };

  async getAll() {
    const productos = await this.knex.from(this.table);
  
    return productos;
  }

  

  async deleteAll() {
      
    await this.knex(this.table).del();

  };


  async updateItem(id, body) {
    const existsProd = await this.knex.from(this.table).count().where({sku: id})

    // Tuve que hacer esta transformacion ya que devuelve un objeto "RowDataPacket" raro con la propiedad 'count(*)' como string.
    const count = JSON.parse(JSON.stringify(existsProd))[0]['count(*)'];

    //Reviso si existe o almenos hay contenido en el archivo.
    if (count){
      const { price, thumbnail, description } = body;
      await this.knex(this.table).where({sku: id}).update({ price, thumbnail, description })

    } else {
      throw `No existe el producto con id: ${id}`
    };
  };

  async deleteById(id) {
    const existsProd = await this.knex.from(this.table).count().where({sku: id})
    
    // Tuve que hacer esta transformacion ya que devuelve un objeto "RowDataPacket" raro con la propiedad 'count(*)' como string.
    const count = JSON.parse(JSON.stringify(existsProd))[0]['count(*)'];
    
    
    if (!count) {
      //Con este throw, saldria de la ejecucion
      throw `No se encontro el producto con id: ${id}`
    } else {
      console.log('vino por aca?')
      await this.knex(this.table).where({sku: id}).del();
      const selectProds = await this.knex.from(this.table).select('sku','price','description','thumbnail');
      const products = JSON.parse(JSON.stringify(selectProds));
      
      return products;
    };
  };

};

module.exports = clsProducts;
