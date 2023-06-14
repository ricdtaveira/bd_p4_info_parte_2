exports.up = function(knex) {
    return knex.schema
      .createTable('alunos', function(table) {
        table.increments('id');
        table.string('nome').notNullable();
        table.string('email').notNullable().unique();
      })
      .createTable('professores', function(table) {
        table.increments('id');
        table.string('nome').notNullable();
        table.string('email').notNullable().unique();
      })
      .createTable('disciplinas', function(table) {
        table.increments('id');
        table.string('nome').notNullable();
        table.integer('professor_id').unsigned();
        table.foreign('professor_id').references('professores.id');
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('disciplinas')
      .dropTableIfExists('professores')
      .dropTableIfExists('alunos');
  };
  