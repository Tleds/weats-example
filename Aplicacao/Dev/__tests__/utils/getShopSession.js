const request = require('supertest');
const app = require('../../src/app');
const Shops = require('../../src/Model/database/models/Shops');
const Addresses = require('../../src/Model/database/models/Addresses');
const Tables = require('../../src/Model/database/models/Tables');
const Shoppings = require('../../src/Model/database/models/Shoppings');
const Shop_types = require('../../src/Model/database/models/Shop_types');

module.exports = {
  async session_shop() {
    const shop_type = await Shop_types.create({
      name: 'loja de shopping',
    });
    const shopping = await Shoppings.create({
      name: 'BH Shopping',
      latitude: '-19.9746033',
      longitude: '19.9746032',
    });
    await Shops.create({
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
      name: 'loja teste',
      cnpj: '53512424000100',
      email: 'loja@gmail.com',
      telephone: '3112345678',
      cellphone: '3191234578',
      password: '123456789',
    });
    const response = await request(app).post('/session_shop').send({
      email: 'loja@gmail.com',
      password: '123456789',
    });
    return response;
  },
};
