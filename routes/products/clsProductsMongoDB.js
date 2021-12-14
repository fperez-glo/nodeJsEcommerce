const Product = require("../../models/mongoProduct");


module.exports = class clsProductsMongoDB {
  
  constructor(table) {
     this.table = table;
  }

  async save(item) {
    
    try {
      const product = new Product(item)
      await product.save()
      return item;
    } catch (err) {
      throw err;
    }
  }

  async getById(id) {
    
    const select = await Product.find({sku: id})
    
    if (select.length) {
      return select[0];
    } else {
      throw `El producto ${id} no existe.`;
    }
  }

  async getAll() {
    
    const productos = await Product.find();
    return productos;
  }

  async deleteAll() {
    
    try {
      await Product.deleteMany();
    } catch (error) {
      throw error;
    }
  }

  async updateItem(id, body) {

    const existsProd = await Product.count({sku: id});

    //Reviso si existe o almenos hay contenido en el archivo.
    if (existsProd) {
      const { price, thumbnail, description } = body;

      await Product.updateOne({sku: id},{price, thumbnail, description})
    } else {
      throw `No existe el producto con id: ${id}`;
    }
  }

  async deleteById(id) {

    const existsProd = await Product.count({sku: id});
    
    if (!existsProd) {
      //Con este throw, saldria de la ejecucion
      throw `No se encontro el producto con id: ${id}`;
    } else {
      await Product.deleteOne({sku: id});

      const selectProds = await Product.find();

      return selectProds;
    }
  }
};
