const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware para analisar o corpo das solicitações como JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conecte-se ao banco de dados SQLite
const db = new sqlite3.Database('SCA.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Crie a tabela TB_ALUNOS, se ainda não existir
db.run(
    'CREATE TABLE IF NOT EXISTS TB_ALUNOS (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, matricula TEXT)',
    (err) => {
        if (err) {
            console.error('Erro ao criar tabela TB_ALUNOS:', err.message);
        } else {
            console.log('Tabela TB_ALUNOS criada com sucesso.');
        }
    }
);

// Rotas para operações CRUD

// Criar um aluno
app.post('/alunos', (req, res) => {
    const { nome, matricula } = req.body;
    db.run('INSERT INTO TB_ALUNOS (nome, matricula) VALUES (?, ?)', [nome, matricula], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: 'Aluno criado com sucesso' });
    });
});

// Obter todos os alunos
app.get('/alunos', (req, res) => {
    db.all('SELECT * FROM TB_ALUNOS', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ alunos: rows });
    });
});

// Obter um aluno por ID
app.get('/alunos/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM TB_ALUNOS WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Aluno não encontrado' });
            return;
        }
        res.json({ aluno: row });
    });
});

// Atualizar um aluno por ID
app.put('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, matricula } = req.body;
    db.run('UPDATE TB_ALUNOS SET nome = ?, matricula = ? WHERE id = ?', [nome, matricula, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Aluno atualizado com sucesso' });
    });
});

// Excluir um aluno por ID
app.delete('/alunos/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM TB_ALUNOS WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Aluno excluído com sucesso' });
    });
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});

