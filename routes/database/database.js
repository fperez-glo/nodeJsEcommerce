const connection = require('./connection.js')
const knex = require ('knex')(connection);


const createTableUsers = async () => {
    await knex.schema.createTable('users', table => {
        table.primary('userId'),
        table.string('name'),
        table.string('password')
    })
};


createTableUsers();