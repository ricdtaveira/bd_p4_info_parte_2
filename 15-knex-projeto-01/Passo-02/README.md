# Passo 2: Configuração do banco de dados #
>
No diretório do projeto editar o arquivo chamado `knexfile.js`. Adicione o seguinte código:
>
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
>
Essa configuração define o banco de dados `SQLite3` e o arquivo `SCA.db` como o local onde o banco de 
dados será criado e armazenado.
>

