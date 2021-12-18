module.exports = class ContenedorSQL {

    constructor(table) {
        this.table = table
      }

    async save() {
        await Cart.create();
        const { dataValues } = await Cart.findOne({
          order: [["cartId", "DESC"]],
          attributes: ["cartId"],
        });
    
        const { cartId } = dataValues;
    
        return cartId;
      }
    
      async getById({ cartId }) {
        const carts = await Cart.count({
          where: {
            cartId,
          },
        });
    
        if (carts) {
          const cartProducts = await Cart.findAll({
            where: {
              cartId,
            },
            attributes: ["products"],
          });
    
          if (!cartProducts.length) {
            throw `No se encontraron productos en el carrito.`;
          }
    
          return JSON.parse(cartProducts[0].products);
        } else {
          throw `No se encontro el carrito con id: ${cartId}.`;
        }
      }
    
      async deleteAll() {
        try {
          await Product.truncate();
        } catch (error) {
          throw error;
        }
      }

      async deleteById({ cartId }) {
        await Cart.destroy({
          where: {
            cartId,
          },
        });
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
}