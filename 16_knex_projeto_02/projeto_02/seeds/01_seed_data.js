exports.seed = function(knex) {
    return knex('professores')
      .del()
      .then(function() {
        return knex('professores').insert([
          { nome: 'Professor 1', email: 'professor1@example.com' },
          { nome: 'Professor 2', email: 'professor2@example.com' },
        ]);
      })
      .then(function() {
        return knex('alunos')
          .del()
          .then(function() {
            return knex('alunos').insert([
              { nome: 'Aluno 1', email: 'aluno1@example.com' },
              { nome: 'Aluno 2', email: 'aluno2@example.com' },
            ]);
          })
          .then(function() {
            return knex('disciplinas')
            .del()
            .then(function() { 
            return knex('disciplinas').insert([
              { nome: 'Disciplina 1' },
              { nome: 'Disciplina 2' },
            ]);
          })
      })
    });
};
  