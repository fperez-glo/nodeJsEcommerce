export default class Mensajes {
  #author;
  #text;

  constructor() {
    this.author = {
      id,
      nombre,
      apellido,
      edad,
      alias,
    };
    this.text = text;
  }

  get message() {
    return `${this.#text};${this.#author}`;
  }

  set sendMessage({ author, text }) {
    const { id, nombre, apellido, edad, alias } = author;
    if (!id || !nombre || !apellido || !edad || !alias || !text)
      throw "Todos los datos solicitados son requeridos";
    if (isNaN(edad))
      throw "La edad debe ser un valor numerico";
    if (edad < 0)
      throw "La edad debe ser un valor mayor a 0";
    this.#id = id;
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#edad = edad;
    this.#alias = alias;
    this.#text = text;
  }
}
