require('../../src/Model/database/index');
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest');
const database = require('../utils/truncate');
const User = require('../../src/Model/database/models/Users');
const factory = require('../factories');
const app = require('../../src/app');

describe('Recuperar', () => {
  it('Recupera com token', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    const shop = await factory.create('Shop');
    const table = await factory.create('Table', {
      id_shop: shop.id,
    });
    const payment_method = await factory.create('Payment_method');
    user = await User.findByPk(user.id);
    const solicitation = await factory.create('Solicitation', {
      id_user: user.id,
      id_table: table.id,
      id_shop: shop.id,
    });
    const shop_payment = await factory.create('Shop_payment', {
      id_shop: shop.id,
      id_payment_method: payment_method.id,
      id_user: user.id,
      id_table: table.id,
      id_solicitation: solicitation.id,
    });
    const response = await request(app)
      .get(`/shop_payments/${shop_payment.id}`)
      .set({
        'x-access-token': user.generateToken(),
      });
    await expect(response.status).toBe(200);
    done();
  });
  it('Recupera sem token', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    const shop = await factory.create('Shop');
    const table = await factory.create('Table', {
      id_shop: shop.id,
    });
    const payment_method = await factory.create('Payment_method');
    user = await User.findByPk(user.id);
    const solicitation = await factory.create('Solicitation', {
      id_user: user.id,
      id_table: table.id,
      id_shop: shop.id,
    });
    const shop_payment = await factory.create('Shop_payment', {
      id_shop: shop.id,
      id_payment_method: payment_method.id,
      id_user: user.id,
      id_table: table.id,
      id_solicitation: solicitation.id,
    });
    const response = await request(app).get(
      `/shop_payments/${shop_payment.id}`
    );
    await expect(response.status).toBe(401);
    done();
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    const payment_method = await factory.create('Payment_method');
    user = await User.findByPk(user.id);
    const shop = await factory.create('Shop');
    const response = await request(app)
      .post('/shop_payments')
      .set({
        'x-access-token': user.generateToken(),
      })
      .send({
        id_shop: shop.id,
        id_payment_method: payment_method.id,
        id_user: user.id,
        id_table: null,
        id_solicitation: null,
        final_price: null,
      });
    await expect(response.status).toBe(400);
    done();
  });
  it('Grava com atributos válidos', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    const shop = await factory.create('Shop');
    const table = await factory.create('Table', {
      id_shop: shop.id,
    });
    const payment_method = await factory.create('Payment_method');
    user = await User.findByPk(user.id);
    const solicitation = await factory.create('Solicitation', {
      id_user: user.id,
      id_table: table.id,
      id_shop: shop.id,
    });
    const response = await request(app)
      .post('/shop_payments')
      .set({
        'x-access-token': user.generateToken(),
      })
      .send({
        id_shop: shop.id,
        id_payment_method: payment_method.id,
        id_user: user.id,
        id_table: table.id,
        id_solicitation: solicitation.id,
        final_price: 21.9,
      });
    await expect(response.status).toBe(200);
    done();
  });
  it('Grava sem token', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    const shop = await factory.create('Shop');
    const table = await factory.create('Table', {
      id_shop: shop.id,
    });
    const payment_method = await factory.create('Payment_method');
    user = await User.findByPk(user.id);
    const solicitation = await factory.create('Solicitation', {
      id_user: user.id,
      id_table: table.id,
      id_shop: shop.id,
    });
    const response = await request(app).post('/shop_payments').send({
      id_shop: shop.id,
      id_payment_method: payment_method.id,
      id_user: user.id,
      id_table: table.id,
      id_solicitation: solicitation.id,
      final_price: 25.58,
    });
    await expect(response.status).toBe(401);
    done();
  });
});
describe('Atualizar', () => {
  it('Atualiza com atributos vazios', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const response = await request(app)
      .put('/shop_payments')
      .send({
        id: 1,
        id_payment_method: 1,
        final_price: null,
      })
      .set({
        'x-access-token': user.generateToken(),
      });
    await expect(response.status).toBe(400);
    done();
  });
  it('Atualiza com atributos válidos', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    const shop = await factory.create('Shop');
    const table = await factory.create('Table', {
      id_shop: shop.id,
    });
    const payment_method = await factory.create('Payment_method');
    user = await User.findByPk(user.id);
    const solicitation = await factory.create('Solicitation', {
      id_user: user.id,
      id_table: table.id,
      id_shop: shop.id,
    });
    const shop_payment = await factory.create('Shop_payment', {
      id_shop: shop.id,
      id_payment_method: payment_method.id,
      id_user: user.id,
      id_table: table.id,
      id_solicitation: solicitation.id,
    });
    const response = await request(app)
      .put('/shop_payments')
      .send({
        id: shop_payment.id,
        id_payment_method: 1,
        final_price: 23.58,
      })
      .set({
        'x-access-token': user.generateToken(),
      });
    await expect(response.status).toBe(200);
    done();
  });
  it('Atualiza sem token', async (done) => {
    const response = await request(app).put('/shop_payments').send({
      id: 1,
      id_payment_method: 1,
      final_price: 23.58,
    });
    await expect(response.status).toBe(401);
    done();
  });
});
