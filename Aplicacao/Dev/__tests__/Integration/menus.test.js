require('../../src/Model/database/index');
const request = require('supertest');
const app = require('../../src/app');
const database = require('../utils/truncate');
const factory = require('../factories');
const Shop = require('../../src/Model/database/models/Shops');

describe('Recuperar', () => {
  beforeEach(async () => {
    await database.cleanDatabase();
  });
  it('Recupera com token', async () => {
    let shop = await factory.create('Shop');
    shop = await Shop.findByPk(shop.id);
    const response = await request(app)
      .get(`/menus/${shop.id}`)
      .set({
        'x-access-token': await shop.generateToken(),
      });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const shop = await factory.create('Shop');
    const response = await request(app).get(`/menus/${shop.id}`);
    expect(response.status).toBe(401);
  });
});
describe('Gravar', () => {
  beforeEach(async () => {
    await database.cleanDatabase();
  });
  it('Grava com atributos vazios', async () => {
    let shop = await factory.create('Shop');
    shop = await Shop.findByPk(shop.id);
    const response = await request(app)
      .post('/menus')
      .set({
        'x-access-token': await shop.generateToken(),
      })
      .send({
        id_shop: shop.id,
        products: [
          {
            name: '',
            price: 10.0,
            description: 'teste descrição',
            id_image: 5,
            id_classification: 1,
          },
        ],
      });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    let shop = await factory.create('Shop');
    shop = await Shop.findByPk(shop.id);
    const response = await request(app)
      .post('/menus')
      .set({
        'x-access-token': await shop.generateToken(),
      })
      .send({
        id_shop: 1,
        products: [
          {
            name: 'produto teste',
            price: 10.0,
            description: 'teste descrição',
            id_image: 5,
            id_classification: 2,
          },
        ],
      });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    const response = await request(app)
      .post('/menus')
      .send({
        id_shop: 1,
        products: [
          {
            name: 'produto1 teste',
            price: 10.0,
            description: 'teste descrição',
            id_image: 5,
            id_classification: 1,
          },
        ],
      });
    expect(response.status).toBe(401);
  });
});
describe('Atualizar', () => {
  beforeEach(async () => {
    await database.cleanDatabase();
  });
  it('Atualiza com atributos vazios', async () => {
    let shop = await factory.create('Shop');
    shop = await Shop.findByPk(shop.id);
    const response = await request(app)
      .put('/menus')
      .set({
        'x-access-token': await shop.generateToken(),
      })
      .send({
        id: 1,
        id_shop: 1,
        products: [
          {
            name: '',
            price: 10.0,
            description: 'teste descrição',
            id_image: 5,
            id_classification: 1,
          },
        ],
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza com atributos válidos', async () => {
    let shop = await factory.create('Shop');
    shop = await Shop.findByPk(shop.id);
    const menu = await factory.create('Menu', {
      id_shop: shop.id,
    });
    const product = await factory.create('Product');
    const response = await request(app)
      .put('/menus')
      .set({
        'x-access-token': await shop.generateToken(),
      })
      .send({
        id: menu.id,
        id_shop: shop.id,
        products: [
          {
            id: product.id,
            name: 'produto2 teste',
            price: 10.0,
            description: 'teste descrição',
            id_image: 5,
            id_classification: 1,
          },
        ],
      });
    expect(response.status).toBe(200);
  });
  it('Atualiza sem token', async () => {
    const response = await request(app)
      .put('/menus')
      .send({
        id: 1,
        id_shop: 1,
        products: [
          {
            name: '',
            price: 10.0,
            description: 'teste descrição',
            id_image: 5,
            id_classification: 1,
          },
        ],
      });
    expect(response.status).toBe(401);
  });
});
describe('Deletar', () => {
  beforeEach(async () => {
    await database.cleanDatabase();
  });
  it('Deleta', async () => {
    let shop = await factory.create('Shop');
    shop = await Shop.findByPk(shop.id);
    const menu = await factory.create('Menu');
    const response = await request(app)
      .delete(`/menus/${menu.id}`)
      .set({
        'x-access-token': await shop.generateToken(),
      });
    expect(response.status).toBe(200);
  });
  it('Deleta sem identificador', async () => {
    let shop = await factory.create('Shop');
    shop = await Shop.findByPk(shop.id);
    const response = await request(app).delete('/menus').set({
      'x-access-token': shop.generateToken(),
    });
    expect(response.status).toBe(404);
  });
  it('Deleta com identificador inexistente', async () => {
    let shop = await factory.create('Shop');
    shop = await Shop.findByPk(shop.id);
    const response = await request(app)
      .delete('/menus/500')
      .set({
        'x-access-token': await shop.generateToken(),
      });
    expect(response.status).toBe(400);
  });
});
