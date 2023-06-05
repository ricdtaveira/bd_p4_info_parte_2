/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    exports.up = function(knex) {
        return knex.schema
          .createTable('tb_alunos', function(table) {
            table.increments('id').primary();
            table.string('nome').notNullable();
            table.string('email').notNullable().unique();
          })
          .createTable('tb_professores', function(table) {
            table.increments('id').primary();
            table.string('nome').notNullable();
            table.string('email').notNullable().unique();
          })
          .createTable('tb_disciplinas', function(table) {
            table.increments('id').primary();
            table.string('nome').notNullable();
            table.integer('professor_id').unsigned().references('id').inTable('professores');
          });
      };
      
      exports.down = function(knex) {
        return knex.schema
          .dropTableIfExists('tb_disciplinas')
          .dropTableIfExists('tb_alunos')
          .dropTableIfExists('tb_professores');
      };

      



  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
