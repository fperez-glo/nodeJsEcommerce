const connections = require('./connection.js')
const mysqlKnex = require ('knex')(connections.mysql);
const sqlite3Knex = require('knex')(connections.sqlite3)

(async () => {
    await mysqlKnex.schema.createTableIfNotExists('productos', table => {
        table.string('sku', 30).primary(),
        table.string('description',200),
        table.decimal('price', 20.5),
        table.string('thumbnail',200)
    });
    
    // TODO: Levantar esta tabla en SQlite3
    // await mysqlKnex.schema.createTableIfNotExists('mensajes', table => {
    //     table.string('email', 100),
    //     table.string('msg',200),
    //     table.datetime('datetime').defaultTo(mysqlKnex.fn.now()) // knex.fn.now() --> CURRENT_TIMESTAMP
    // });
})();





