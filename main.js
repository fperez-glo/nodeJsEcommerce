require('dotenv').config();
const argsParser = require('minimist');
const compression = require('compression');
const { getLogger, configure } = require('log4js');
const express = require(`express`);
const port = argsParser(process.argv.slice(2)).port || process.env.PORT || 8081;

//CLUSTER MODULE
const cluster = require("cluster");
const cpuQty = require('os').cpus().length;
const { mode } = argsParser(process.argv.slice(2));

//CONFIGURO LOGGER LOG4JS
configure({
  appenders: {
      //Appender para generar logs en consola.
      ConsoleLogguer:   { type: 'console' },
      //Appenders para generar logs en archivos.
      WarningFile:      { type: 'file', filename: 'warning.log' },
      ErrorFile:     { type:'file', filename: 'error.log' },
  },
  //Las categorias que defino y en el nivel que van a trabajar los logs
  categories: {
      default: { appenders: ['ConsoleLogguer'], level: 'trace' },
      console: { appenders: ['ConsoleLogguer'], level: 'debug' },
      fileWarning:    { appenders: ['WarningFile'], level: 'warn' },
      fileError:   { appenders: ['ErrorFile'], level: 'error' },
  }
});
const cInfo = getLogger('consoleInfo');
const fileWarn = getLogger('fileWarning');
const fileErr = getLogger('fileError');
// console.log('NODE ENVIORMENT:',nodeEnviorment)
// console.log('cluster.isPrimary:',cluster.isPrimary)

if (cluster.isPrimary && mode === 'CLUSTER') {
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

  //Middleware logger
  app.use(function ({method, originalUrl}, { statusCode }, next) {
    const logInfo = `Req: [${method}] ${originalUrl}`;

    console.log('statusCode:',statusCode)
    
    cInfo.info(logInfo)
    next();
  });
  //app.use(compression());
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

  app.post('/productos', (req, res)=> {
    const err = 'No se pudieron agregar los productos a la base de datos';
    cInfo.error(err);
    fileErr.error(err);
    res.send({err});
  })

  app.post('/mensajes', (req, res)=> {
    const err = 'No se pudo enviar el mensaje';
    cInfo.error(err);
    fileErr.error(err);
    res.send({err});
  })

  app.get('/*',function ({method,originalUrl}, { statusCode }, next) {
    const logInfo = `Res: [${method}] ${originalUrl} statusCode: ${statusCode}}`;
    cInfo.warn(`[ERROR][RUTA INEXISTENTE] ${logInfo}`)
    fileWarn.warn(`[ERROR][RUTA INEXISTENTE] ${logInfo}`)
    next();
  })
  
  app.listen(port, ()=> {
    if (!cluster.isPrimary) {
      console.log(`Worker process start ${process.pid}, port: ${port}`)
    } else {
      console.log(`Server pId: ${process.pid}, port: ${port}`)
    };
  });

};