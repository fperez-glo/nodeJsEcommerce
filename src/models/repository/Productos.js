export default class Producto {
    #sku;
    #title;
    #description;
    #price;
    #thumbnail;
    #stock;
  
    constructor() {
      this.sku = sku;
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.stock = stock;
    }
  
    get sku() {
      return this.#sku;
    }
    get price() {
      return this.#price;
    }
    get title() {
      return `${this.#sku}-${this.#title}`;
    }
    get prodDetail() {
      return `${this.#title};${this.#description};${this.#price};${
        this.#stock
      }`;
    }
    get prodPicture() {
        return this.#thumbnail;
    }
  
    set price(value) {
        if(!value) throw 'No se envio el precio a actualizar'
        if(isNaN(value)) throw 'El precio debe ser un valor numerico'
        if(precio < 0) throw 'El precio debe ser un valor mayor a 0'
        this.#price = value;
    }
  
    set prodDetail({ title, description, price, stock, thumbnail }) {
      if(!title || !description || !price || !stock || !thumbnail) throw 'Todos los datos solicitados son requeridos';
      if(isNaN(stock) || isNaN(price)) throw 'El stock y el precio deben ser valores numericos';
      if(stock < 0 || price < 0) throw 'El stock y el precio deben ser valores mayores a 0';
      this.#title = title;
      this.#description = description;
      this.#price = price;
      this.#stock = stock;
      this.#thumbnail = thumbnail;
  }
  }
  