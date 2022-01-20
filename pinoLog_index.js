const logger = require('pino')();

logger.info('hello info!!!');
logger.error('Hello error!!');
logger.info('La respuesta es %d', 66666);
logger.info({ a: 42 }, 'Hola objeto');    



//Se puede delegar la tarea a un child (para que vaya por otro proceso)
//Si o si child recibe un objeto vacio.
const child = logger.child({})

child.info('Delego el log a un child en otro processId')