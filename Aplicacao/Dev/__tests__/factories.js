const { factory } = require('factory-girl');
const faker = require('faker-br');
const Shop = require('../src/Model/database/models/Shops');
const User = require('../src/Model/database/models/Users');
const Table = require('../src/Model/database/models/Tables');
const Shop_type = require('../src/Model/database/models/Shop_types');
const Shopping = require('../src/Model/database/models/Shoppings');
const Payment_method = require('../src/Model/database/models/Payment_methods');
const Solicitation = require('../src/Model/database/models/Solicitations');
const SolicitationItems = require('../src/Model/database/models/Solicitation_items');
const Shop_payment = require('../src/Model/database/models/Shop_payments');
const Menu = require('../src/Model/database/models/Menus');
const Product = require('../src/Model/database/models/Products');

factory.define('Menu', Menu, {
  id_shop: 1,
});
factory.define('Product', Product, {
  name: 'Teste',
  price: 10.0,
  description: 'teste descrição',
  id_image: 5,
  id_classification: 1,
});
factory.define('SolicitationItems', SolicitationItems, {
  id_solicitation: 1,
  id_product: 1,
  amount: 4,
  observation: 'Com gelo',
  price: 10,
});
factory.define('Shop_payment', Shop_payment, {
  id_shop: 1,
  id_payment_method: 2,
  id_user: 1,
  id_solicitation: 1,
  final_price: 23.58,
});
factory.define('Solicitation', Solicitation, {
  id_shop: 1,
  id_user: 1,
  id_table: 1,
  price: 21.9,
  solicitation_password: faker.random.number(),
});
factory.define('Payment_method', Payment_method, {
  description: 'NU Bank Débito',
  id_payment_method_type: 1,
  id_card_flag: 1,
});
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
