require('dotenv').config();
const argsParser = require('minimist')
//Lo pongo momentaneamente para el desafio de webSockets

const express = require(`express`);



//CLUSTER MODULE
const cluster = require("cluster");
const cpuQty = require('os').cpus().length;
const { mode } = argsParser(process.argv.slice(2));


// console.log('NODE ENVIORMENT:',nodeEnviorment)
// console.log('cluster.isPrimary:',cluster.isPrimary)

if (cluster.isPrimary && mode === 'CLUSTER') {
  console.log(`Proceso Master ejecutandose en pId: ${process.pid}`)

  //Worker generator
  for (let i = 0; i < cpuQty; i++) {
    cluster.fork();
  };

  //listen para liberar los procesos.
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died.`)
  });

} else {
  const app = express();
  const port = argsParser(process.argv.slice(2)).port || process.env.PORT || 8082;

  //Seteo las rutas del motor de plantillas ejs.
  app.set("view engine", "ejs");
  app.set("views", "./views");

  const randoms = require('./routes/randoms/randoms')
  const info = require('./routes/info/info');

  //Este midleware te permite recibir el body que se envia como JSON desde POSTMAN por ej.
  app.use(express.json());
  //Este midleware te permite recibir el body que se envia como POST desde un formulario HTML
  app.use(express.urlencoded({ extended: false }));

  app.use(express.static(__dirname + "/views"));

  app.use('/info', info);
  app.use('/api/randoms', randoms)

  
  app.listen(port, ()=> {
    if (!cluster.isPrimary) {
      console.log(`Worker process start ${process.pid}, port: ${port}`)
    } else {
      console.log(`Server pId: ${process.pid}, port: ${port}`)
    };
  });

};