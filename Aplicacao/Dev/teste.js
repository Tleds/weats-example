const cp = require('./Model/Repository/criptografia');

/*let a = cp.dcp('dfe69b30adfba6ea727b5822e58302b03fafe231569f6af8fe759aabe7f9e2a5b3d4443f7e2d8d53d236fa07437c3f39');
console.log(a);*/

require('dotenv').config({
  path: process.env.NODE_ENV == 'teste' ? '.env.test' : '.env'
});
console.log(process.env.NODE_ENV)
console.log(process.env.DB_HOST)