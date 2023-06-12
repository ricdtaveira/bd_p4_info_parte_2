const knex = require('../config/database');

knex('tb_users')
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    
  })
  .finally(() => {
    knex.destroy();
  });