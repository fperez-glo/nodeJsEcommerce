const fs = require("fs");
const { Product } = require("../../models/mysqlProduct");


module.exports = class clsProductsMysql {
  constructor(table = 'productos') {
    (this.products = []), (this.table = table);
  }

  async save(item) {
    
    try {
      await Product.create(item);
      return item;
    } catch (err) {
      throw err;
    }
  }

  async getById(id) {
    
    const select = await Product.findAll({
      where: {
        sku: id,
      },
    });

    if (select.length) {
      const element = JSON.parse(JSON.stringify(select))[0];
      return element;
    } else {
      throw `El producto ${id} no existe.`;
    }
  }

  async getAll() {
    
    const productos = await Product.findAll();
    return productos;
  }

  async deleteAll() {
    
    try {
      await Product.truncate();
    } catch (error) {
      throw error;
    }
  }

  async updateItem(id, body) {

    const existsProd = await Product.count({
      where: {
        sku: id,
      },
    });

    //Reviso si existe o almenos hay contenido en el archivo.
    if (existsProd) {
      const { price, thumbnail, description } = body;

      await Product.update(
        { price, thumbnail, description },
        { where: { sku: id } }
      );
    } else {
      throw `No existe el producto con id: ${id}`;
    }
  }

  async deleteById(id) {

    const existsProd = await Product.count({
      where: {
        sku: id,
      },
    });

    if (!existsProd) {
      //Con este throw, saldria de la ejecucion
      throw `No se encontro el producto con id: ${id}`;
    } else {
      await Product.destroy({
        where: {
          sku: id
        }
      });

      const selectProds = await Product.findAll()

      const products = JSON.parse(JSON.stringify(selectProds));

      return products;
    }
  }
};

