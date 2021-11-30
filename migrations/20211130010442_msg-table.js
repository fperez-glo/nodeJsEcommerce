
exports.up = async function(knex) {
    await knex.schema.createTableIfNotExists('mensajes', table => {
        table.string('email', 100),
        table.string('msg',200),
        table.datetime('datetime').defaultTo(knex.fn.now()) // knex.fn.now() --> CURRENT_TIMESTAMP
    });
};

exports.down = function(knex) {};
