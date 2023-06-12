exports.up = function(knex) {
  return knex.schema.createTable('tb_profiles', (table) => {
    table.increments('id').primary();
    table.text('bio');
    table.text('description');
    table.integer('user_id').unique().unsigned();
    table.foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_profiles');
};
