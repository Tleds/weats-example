require('../../src/Model/database/index');
const request = require('supertest');
const Shops = require('../../src/Model/database/models/Shops');
const Addresses = require('../../src/Model/database/models/Addresses');
const Shoppings = require('../../src/Model/database/models/Shoppings');
const Shop_types = require('../../src/Model/database/models/Shop_types');
const app = require('../../src/app');
const connection = require('../../src/Model/database/index');

afterAll(async () => {
  await connection.close();
});
describe('Authentication with JWT', () => {
  beforeAll(async () => {
    await Addresses.destroy({ truncate: { cascade: true } });
    await Shops.destroy({ truncate: { cascade: true } });
    await Shop_types.destroy({ truncate: { cascade: true } });
    await Shoppings.destroy({ truncate: { cascade: true } });

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
  });
  afterAll(async () => {
    await Addresses.destroy({ truncate: { cascade: true } });
    await Shops.destroy({ truncate: { cascade: true } });
    await Shop_types.destroy({ truncate: { cascade: true } });
    await Shoppings.destroy({ truncate: { cascade: true } });
  });
  it('Cria uma sessão com credenciais nulas', async () => {
    const response = await request(app).post('/session_shop').send({
      email: '',
      password: '',
    });
    expect(response.status).toBe(400);
  });
  it('Cria uma sessão com email inválido', async () => {
    const response = await request(app).post('/session_shop').send({
      email: 'teste@invalido.com',
      password: '123456789',
    });
    expect(response.status).toBe(400);
  });
  it('Cria uma sessão com senha inválida', async () => {
    const response = await request(app).post('/session_shop').send({
      email: 'loja@gmail.com',
      password: '1234',
    });
    expect(response.status).toBe(400);
  });
  it('Cria uma sessão com credenciais válidas', async () => {
    const response = await request(app).post('/session_shop').send({
      email: 'loja@gmail.com',
      password: '123456789',
    });
    expect(response.status).toBe(200);
  });
});
