require('dotenv').config();
const express = require('express');
const { getLogger, configure } = require('log4js');

const app = express();

configure({
    appenders: {
        //Appender para generar logs en consola.
        miLogguerConsole:   { type: 'console' },
        //Appenders para generar logs en archivos.
        miLogguerFile:      { type: 'file', filename: 'info.log' },
        miLogguerFile2:     { type:'file', filename: 'info2.log' },
    },
    //Las categorias que defino y en el nivel que van a trabajar los logs
    categories: {
        default: { appenders: ['miLogguerConsole'], level: 'trace' },
        console: { appenders: ['miLogguerConsole'], level: 'debug' },
        file:    { appenders: ['miLogguerFile'], level: 'warn' },
        file2:   { appenders: ['miLogguerFile2'], level: 'info' },
        todos:   { appenders: ['miLogguerConsole','miLogguerFile','miLogguerFile2'], level: 'error' },
    }
});

// TIPOS DE NIVELES: /////
/* 
    debug
    info
    warn
    error
    fatal
*/

const logger = getLogger('file2');

logger.trace('hola desde logger trace.');
logger.debug('hola desde logger debug.');
logger.info('hola desde logger info.');
logger.warn('hola desde logger warn.');
logger.error('hola desde logger error.');
logger.fatal('hola desde logger fatal.');

app.get('/', (req,res) => {
    res.send('hola desde la raiz "/".');
    
});

app.listen(8080, () => {
    console.log('Servidor ok 8080')
});