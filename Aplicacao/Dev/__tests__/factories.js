const { factory } = require('factory-girl');
const faker = require('faker-br');
const Shop = require('../src/Model/database/models/Shops');
const User = require('../src/Model/database/models/Users');
const Table = require('../src/Model/database/models/Tables');
const Shop_type = require('../src/Model/database/models/Shop_types');
const Shopping = require('../src/Model/database/models/Shoppings');

factory.define('Table', Table, {
  id_shop: 1,
  description: 'teste',
});
factory.define('Shop', Shop, {
  id_shopping: 1,
  id_shop_type: 1,
  name: faker.internet.userName(),
  cnpj: faker.br.cnpj(),
  email: faker.internet.email(),
  telephone: '3112345678',
  cellphone: '3191234578',
  password: '123456789',
  id_image: null,
});
factory.define('Shop_type', Shop_type, {
  name: faker.internet.userName(),
});
factory.define('Shopping', Shopping, {
  name: faker.internet.userName(),
  latitude: '-19.9746033',
  longitude: '19.9746032',
  id_image: null,
});
factory.define('User', User, {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: '12346789',
  telephone: '3112345678',
  cellphone: '31912345678',
  cpf: faker.br.cpf(),
});
module.exports = factory;
