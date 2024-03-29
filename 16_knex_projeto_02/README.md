# CRUD com Knex #
>
Aqui está um exemplo de aplicação Node.js usando o Knex e o banco de dados 
Sqlite3, com arquivos separados para migrations, seeds e CRUD das tabelas Aluno, Professor e 
Disciplina:
>
> 
1. Certifique-se de ter o Node.js instalado em seu ambiente de desenvolvimento.

2. Crie uma nova pasta para o projeto e abra-a em seu editor de código.

3. Inicie um novo projeto Node.js executando o seguinte comando no terminal, dentro da pasta 
do projeto:

```
npm init -y
```
4. Agora, instale as dependências necessárias (Knex e Sqlite3):
```
npm install knex sqlite3

```
>
5. Configuração do banco de dados 
Crie um novo arquivo chamado **knexfile.js** no diretório raiz do projeto e adicione o seguinte código:
```
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './SCA.db'
    },
    useNullAsDefault: true
  }
};
```

>
6. Use o comando **npx knex migrate:make create_tables** para criar uma pasta chamada **migrations** e dentro 
dessa pasta será criado o um arquivo chamado **20230614120000_create_tables.js**. O time stamp no header do arquivo criado 
vai depender da data/hora/minuto/segundo e milisegundo do momento em que foi executado o comando **npx**. Adicione o seguinte código ao arquivo:

```
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

```
7. Executar o comando **knex migrate:latest** a partir do diretório raiz. Observar que o banco de dados
foi criado na raiz do projeto como definido no arquivo **knexfile.js**.


8. Crie uma pasta chamada **seeds** dentro do diretório do projeto e crie um arquivo chamado 
**01_seed_data.js**. Adicione o seguinte código ao arquivo:

```
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
          return knex('disciplinas').del();
        });
    });
};

```
9. Execute o comando **knex seed:run** para executar o script do seed a partir do diretório 
raiz. Verifique se as tabelas foram populadas usando o **DBrowser**.


10. Crie uma pasta chamada **models** dentro do diretório do projeto. Em seguida, crie os arquivos 
**Aluno.js**, **Professor.js** e **Disciplina.js** dentro da pasta **models**. Adicione o seguinte código aos 
arquivos:

**Aluno.js:**

```
const knex = require('knex');
const database = knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite'
  }
});

class Aluno {
  static async criarAluno(aluno) {
    try {
      const [id] = await database('alunos').insert(aluno);
      console.log('Aluno criado com ID:', id);
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
    } finally {
      database.destroy();
    }
  }

  static async atualizarAluno(id, aluno) {
    try {
      const result = await database('alunos').where({ id }).update(aluno);
      console.log('Aluno atualizado:', result);
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
    } finally {
      database.destroy();
    }
  }

  static async obterAluno(id) {
    try {
      const aluno = await database('alunos').where({ id }).first();
      console.log('Aluno encontrado:', aluno);
    } catch (error) {
      console.error('Erro ao obter aluno:', error);
    } finally {
      database.destroy();
    }
  }

  static async excluirAluno(id) {
    try {
      const result = await database('alunos').where({ id }).del();
      console.log('Aluno excluído:', result);
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
    } finally {
      database.destroy();
    }
  }
}

module.exports = Aluno;

```

**Professor.js:**

```
const knex = require('knex');
const database = knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite'
  }
});

class Professor {
  static async criarProfessor(professor) {
    try {
      const [id] = await database('professores').insert(professor);
      console.log('Professor criado com ID:', id);
    } catch (error) {
      console.error('Erro ao criar professor:', error);
    } finally {
      database.destroy();
    }
  }

  static async atualizarProfessor(id, professor) {
    try {
      const result = await database('professores').where({ id }).update(professor);
      console.log('Professor atualizado:', result);
    } catch (error) {
      console.error('Erro ao atualizar professor:', error);
    } finally {
      database.destroy();
    }
  }

  static async obterProfessor(id) {
    try {
      const professor = await database('professores').where({ id }).first();
      console.log('Professor encontrado:', professor);
    } catch (error) {
      console.error('Erro ao obter professor:', error);
    } finally {
      database.destroy();
    }
  }

  static async excluirProfessor(id) {
    try {
      const result = await database('professores').where({ id }).del();
      console.log('Professor excluído:', result);
    } catch (error) {
      console.error('Erro ao excluir professor:', error);
    } finally {
      database.destroy();
    }
  }
}

module.exports = Professor;

```
**Disciplina.js**
```
const knex = require('knex');
const database = knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite'
  }
});

class Disciplina {
  static async criarDisciplina(disciplina) {
    try {
      const [id] = await database('disciplinas').insert(disciplina);
      console.log('Disciplina criada com ID:', id);
    } catch (error) {
      console.error('Erro ao criar disciplina:', error);
    } finally {
      database.destroy();
    }
  }

  static async atualizarDisciplina(id, disciplina) {
    try {
      const result = await database('disciplinas').where({ id }).update(disciplina);
      console.log('Disciplina atualizada:', result);
    } catch (error) {
      console.error('Erro ao atualizar disciplina:', error);
    } finally {
      database.destroy();
    }
  }

  static async obterDisciplina(id) {
    try {
      const disciplina = await database('disciplinas').where({ id }).first();
      console.log('Disciplina encontrada:', disciplina);
    } catch (error) {
      console.error('Erro ao obter disciplina:', error);
    } finally {
      database.destroy();
    }
  }

  static async excluirDisciplina(id) {
    try {
      const result = await database('disciplinas').where({ id }).del();
      console.log('Disciplina excluída:', result);
    } catch (error) {
      console.error('Erro ao excluir disciplina:', error);
    } finally {
      database.destroy();
    }
  }
}

module.exports = Disciplina;

```
11. No arquivo **index.js**, adicione o seguinte código:

```
const Aluno = require('./models/Aluno');
const Professor = require('./models/Professor');
const Disciplina = require('./models/Disciplina');

// Exemplo de uso
const exemploAluno = {
  nome: 'João',
  email: 'joao@example.com'
};

Aluno.criarAluno(exemploAluno);

```
>
>
Certifique-se de adaptar a estrutura e a lógica da aplicação às suas necessidades específicas. Esta 
é uma implementação básica que usa o Knex e o banco de dados Sqlite3 com arquivos separados para 
migrations, seeds e CRUD.
>
