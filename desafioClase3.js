const fs = require('fs');
let id = 0;
let items = [];

class Contenedor {

    constructor(fileName){
        this.fileName = fileName
    };

    save(items){
        const idGenerator = () => {
            fs.readFile(`./${this.fileName}`,`utf-8`,(err, data) => {
                if(err){
                    throw `Error al leer el archivo.`
                };



            })
            id += 1
            return id
        };

        //fs.appendFile(`./${this.fileName}`,`"${item.id}":`+JSON.stringify(item, null, 2)+`,\n`, (err)=>{
        fs.writeFile(`./${this.fileName}`,JSON.stringify(items, null, 2)+`,\n`, (err)=>{
            if(err){
                throw `Error en la escritura del archivo ${this.fileName}`
            };

        });
        
        //return console.log('Se guardaron los items con id:', items.id);
    };

    getById(number){

    };

    getAll(){

    };

    deleteById(number){

    };

    deleteAll(){

    };
};

const itemContainer = new Contenedor('items.txt');
items.push({title: `Harina`, price: 78, picture: `foto de harina`});

itemContainer.save(items);

//items.forEach(el => {
//    itemContainer.save(el);
//});

//const stringify = JSON.stringify(items, null ,2);
//console.log(`items stringify:`,stringify);

//const JSONgeado = JSON.parse(stringify)
//console.log(`items JSONgeado:`,JSONgeado);




// const parse = JSON.parse('./items.txt')
// console.log(parse)



// const obj1 = {
//     a: 'a',
//     b: 'b',
//     c: {
//         d: 'd',
//         e: 'e',
//     },
//     editA() {
//         this.a = 'Abcd'
//     }
// };
// console.log(obj1)
// const stringifiedComplexObj = JSON.stringify(obj1, null ,2);
// // "{\"a\":\"a\",\"b\":\"b\",\"c\":{\"d\":\"d\",\"e\":\"e\"},\"f\":[1,\"2\",3]}"
// console.log('stringifiedComplexObj:',stringifiedComplexObj)
// const obj2 = JSON.parse(stringifiedComplexObj); 
// console.log('obj2:',obj2)
// // {a: "a", b: "b", c: {d: "d", e: "e"}}

