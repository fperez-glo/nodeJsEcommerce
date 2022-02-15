import log4js from 'log4js';

const { configure, getLogger } = log4js;
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
  
const console = getLogger('console');
const fileWarn = getLogger('fileWarning');
const fileErr = getLogger('fileError');

export { console, fileWarn, fileErr };