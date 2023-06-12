exports.up = function(knex) {
  return knex.schema.createTable('tb_roles', (table) => {
    table.increments('id').primary();
    table.string('name', 150).notNullable().unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_roles');
};
