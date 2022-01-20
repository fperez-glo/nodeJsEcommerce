const { createLogger, transports } = require('winston')


const logger = createLogger({
    transports: [
        new transports.Console({
            level: 'verbose'
        }),
        new transports.File({
            filename: 'info2.log',
            level: 'error'
        })
    ]
})

// logger.log('silly', '127.0.0.1 - log silly');
// logger.log('debug', '127.0.0.1 - log debug');
// logger.log('verbose', '127.0.0.1 - log verbose');
// logger.log('info', '127.0.0.1 - log info');
// logger.log('warn', '127.0.0.1 - log warn');
// logger.log('error', '127.0.0.1 - log error');

logger.silly('127.0.0.1 - log silly');
logger.debug('127.0.0.1 - log debug');
logger.verbose('127.0.0.1 - log verbose');
logger.info('127.0.0.1 - log info');
logger.warn('127.0.0.1 - log warn');
logger.error('127.0.0.1 - log error');
logger.verbose('127.0.0.1 - log verbose');
logger.error('127.0.0.1 - log error');

