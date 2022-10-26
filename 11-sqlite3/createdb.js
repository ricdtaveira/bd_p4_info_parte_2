// Criação de um Banco de Dados e de uma tabela

var sqlite3 = require('sqlite3');
 
var db = new sqlite3.Database('BD_SCA.db');
 
db.serialize(function() {

// Create a table
 db.run("CREATE TABLE IF NOT EXISTS TB_ALUNO (id INTEGER PRIMARY KEY, nome TEXT)");
 
// Insert data into the table
 db.run("INSERT INTO TB_ALUNO (name) VALUES ('Maria Yohana')");
 
// Query data from the table
 db.each("SELECT id, name FROM TB_ALUNO", function(err, row) {
    console.log(row.id + ": " + row.nome);
  });
});
 
db.close();
