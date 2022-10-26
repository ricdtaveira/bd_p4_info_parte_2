// Criação de um Banco de Dados e de uma tabela

var sqlite3 = require('sqlite3');
 
var db = new sqlite3.Database('example.db');
 
db.serialize(function() {

// Create a table
 db.run("CREATE TABLE IF NOT EXISTS Foo (id INTEGER PRIMARY KEY, name TEXT)");
 
// Insert data into the table
 db.run("INSERT INTO Foo (name) VALUES ('bar')");
 
// Query data from the table
 db.each("SELECT id, name FROM Foo", function(err, row) {
    console.log(row.id + ": " + row.name);
  });
});
 
db.close();
