require('../../src/Model/database/index');
const request = require('supertest');
const database = require('../utils/truncate');
const factory = require('../factories');
const Shop = require('../../src/Model/database/models/Shops');
const app = require('../../src/app');
// const connection = require('../../src/Model/database/index');

describe('Recuperar', () => {
  it('Recupera com token', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');

    const shop_type = await factory.create('Shop_type');

    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });

    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const response = await request(app).get(`/tables/${shop.id}`).set({
      'x-access-token': shop.generateToken(),
    });
    expect(response.status).toBe(200);
    await done();
  });
  it('Recupera sem token', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    const shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    const response = await request(app).get(`/tables/${shop.id}`);
    expect(response.status).toBe(401);
    await done();
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const response = await request(app)
      .post('/tables')
      .set({
        'x-access-token': await shop.generateToken(),
      })
      .send({
        id_shop: shop.id,
        description: '',
      });
    await expect(response.status).toBe(400);
    await done();
  });
  it('Grava com atributos válidos', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });

    const response = await request(app)
      .post('/tables')
      .set({
        'x-access-token': await shop.generateToken(),
      })
      .send({
        id_shop: shop.id,
        description: 'mesa1 teste',
      });
    await expect(response.status).toBe(200);
    await done();
  });
  it('Grava sem token', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    const shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    const response = await request(app).post('/tables').send({
      id_shop: shop.id,
      description: 'mesa2 teste',
    });
    await expect(response.status).toBe(401);
    await done();
  });
});
describe('Atualizar', () => {
  it('Atualiza com atributos vazios', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const table = await factory.create('Table', {
      id_shop: shop.id,
    });
    const response = await request(app)
      .put('/tables')
      .send({
        id: table.id,
        id_shop: shop.token,
        description: '',
      })
      .set({
        'x-access-token': await shop.generateToken(),
      });
    expect(response.status).toBe(400);
    await done();
  });
  it('Atualiza com atributos válidos', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const table = await factory.create('Table', {
      id_shop: shop.id,
    });
    const response = await request(app)
      .put('/tables')
      .send({
        id: table.id,
        id_shop: shop.id,
        description: 'mesa5 teste',
      })
      .set({
        'x-access-token': await shop.generateToken(),
      });
    await expect(response.status).toBe(200);
    await done();
  });
  it('Atualiza sem token', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    const shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    const table = await factory.create('Table', {
      id_shop: shop.id,
    });

    const response = await request(app).put('/tables').send({
      id: table.id,
      id_shop: shop.id,
      description: 'mesa5 teste',
    });
    await expect(response.status).toBe(401);
    await done();
  });
});
describe('Deletar', () => {
  it('Deleta', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    const table = await factory.create('Table', {
      id_shop: shop.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const response = await request(app)
      .delete(`/tables/${table.id}`)
      .set({
        'x-access-token': await shop.generateToken(),
      });
    expect(response.status).toBe(200);
    await done();
  });
  it('Deleta sem identificador', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const response = await request(app)
      .delete('/tables')
      .set({
        'x-access-token': await shop.generateToken(),
      });
    expect(response.status).toBe(404);
    await done();
  });
  it('Deleta com identificador inexistente', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const response = await request(app)
      .delete('/tables/50')
      .set({
        'x-access-token': await shop.generateToken(),
      });
    expect(response.status).toBe(400);
    await done();
  });
});
