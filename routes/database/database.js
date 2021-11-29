const connection = require('./connection.js')
const knex = require ('knex')(connection);


(async () => {
    await knex.schema.createTableIfNotExists('users', table => {
        table.string('userId',30),
        table.string('name',30),
        table.string('password',30),

        table.primary('userId')

    })
})();


