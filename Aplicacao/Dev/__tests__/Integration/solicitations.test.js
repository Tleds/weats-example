require('../../src/Model/database/index');
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest');
const database = require('../utils/truncate');
const factory = require('../factories');
const User = require('../../src/Model/database/models/Users');
const app = require('../../src/app');

describe('Recuperar', () => {
  beforeEach(async () => {
    await database.cleanDatabase();
  });
  it('Recupera com token', async () => {
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const shop = await factory.create('Shop');
    const solicitation = await factory.create('Solicitation', {
      id_shop: shop.id,
      id_user: user.id,
      id_table: null,
    });
    const response = await request(app)
      .get(`/solicitations/${solicitation.id}`)
      .set({
        'x-access-token': user.generateToken(),
      });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const user = await factory.create('User');
    const shop = await factory.create('Shop');
    const solicitation = await factory.create('Solicitation', {
      id_shop: shop.id,
      id_user: user.id,
      id_table: null,
    });
    const response = await request(app).get(
      `/solicitations/${solicitation.id}`
    );
    expect(response.status).toBe(401);
  });
});
describe('Gravar', () => {
  beforeEach(async () => {
    await database.cleanDatabase();
  });
  it('Grava com atributos vazios', async () => {
    let user = await factory.create('User');
    const shop = await factory.create('Shop');
    user = await User.findByPk(user.id);
    const response = await request(app)
      .post('/solicitations')
      .set({
        'x-access-token': user.generateToken(),
      })
      .send({
        id_shop: shop.id,
        id_user: user.id,
        id_solicitation_status: 1,
        price: 19.9,
        solicitation_items: [
          {
            id_product: 1,
            amount: 4,
            observation: 'Com gelo',
            price: 10,
          },
          {
            id_product: 2,
            amount: 2,
            price: 4.99,
          },
          {
            id_product: 3,
            amount: 2,
            price: 4.99,
          },
        ],
      });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    let user = await factory.create('User');
    const shop = await factory.create('Shop');
    user = await User.findByPk(user.id);
    const response = await request(app)
      .post('/solicitations')
      .set({
        'x-access-token': user.generateToken(),
      })
      .send({
        id_shop: shop.id,
        id_user: user.id,
        id_solicitation_status: 1,
        price: 19.9,
        solicitation_password: 761325436,
        solicitation_items: [
          {
            id_product: 1,
            amount: 4,
            observation: 'Com gelo',
            price: 10,
          },
          {
            id_product: 2,
            amount: 2,
            price: 4.99,
          },
          {
            id_product: 3,
            amount: 2,
            price: 4.99,
          },
        ],
      });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    const user = await factory.create('User');
    const shop = await factory.create('Shop');
    const response = await request(app)
      .post('/solicitations')
      .send({
        id_shop: shop.id,
        id_user: user.id,
        id_solicitation_status: 1,
        price: 19.9,
        solicitation_password: 761325436,
        solicitation_items: [
          {
            id_product: 1,
            amount: 4,
            observation: 'Com gelo',
            price: 10,
          },
          {
            id_product: 2,
            amount: 2,
            price: 4.99,
          },
          {
            id_product: 3,
            amount: 2,
            price: 4.99,
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
    const shop = await factory.create('Shop');
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const solicitation = await factory.create('Solicitation', {
      id_shop: shop.id,
      id_user: user.id,
      id_table: null,
    });
    const response = await request(app)
      .put('/solicitations')
      .set({
        'x-access-token': user.generateToken(),
      })
      .send({
        id_shop: shop.id,
        id_solicitation: solicitation.id,
        id_user: user.id,
        id_solicitation_status: 1,
        price: 39.9,
        solicitation_password: 761325436,
        solicitation_items: [
          {
            amount: 4,
            observation: 'Com gelo',
            price: 10,
          },
          {
            id_product: 2,
            amount: 2,
            price: 4.99,
          },
          {
            id_product: 3,
            amount: 2,
            price: 4.99,
          },
        ],
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza com atributos válidos', async () => {
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const shop = await factory.create('Shop');
    const solicitation = await factory.create('Solicitation', {
      id_shop: shop.id,
      id_user: user.id,
    });
    const response = await request(app)
      .put('/solicitations')
      .set({
        'x-access-token': user.generateToken(),
      })
      .send({
        id: solicitation.id,
        id_user: user.id,
        id_shop: shop.id,
        id_solicitation_status: 1,
        price: 59.9,
        solicitation_password: 761325436,
        solicitation_items: [
          {
            id_product: 1,
            amount: 4,
            observation: 'Com gelo',
            price: 10,
          },
          {
            id_product: 2,
            amount: 2,
            price: 4.99,
          },
          {
            id_product: 3,
            amount: 2,
            price: 4.99,
          },
        ],
      });
    expect(response.status).toBe(200);
  });
  it('Atualiza sem identificador', async () => {
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const shop = await factory.create('Shop');
    const response = await request(app)
      .put('/solicitations')
      .set({
        'x-access-token': user.generateToken(),
      })
      .send({
        id_user: user.id,
        id_shop: shop.id,
        id_solicitation_status: 1,
        price: 59.9,
        solicitation_password: 761325436,
        solicitation_items: [
          {
            id_product: 1,
            amount: 4,
            observation: 'Com gelo',
            price: 10,
          },
          {
            id_product: 2,
            amount: 2,
            price: 4.99,
          },
          {
            id_product: 3,
            amount: 2,
            price: 4.99,
          },
        ],
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza sem token', async () => {
    const user = await factory.create('User');
    const shop = await factory.create('Shop');
    const solicitation = await factory.create('Solicitation', {
      id_shop: shop.id,
      id_user: user.id,
      id_table: null,
    });
    const response = await request(app)
      .put('/solicitations')
      .send({
        id_solicitation: solicitation.id,
        id_user: user.id,
        id_shop: shop.id,
        id_solicitation_status: 1,
        price: 59.9,
        solicitation_password: 761325436,
        solicitation_items: [
          {
            id_product: 1,
            amount: 4,
            observation: 'Com gelo',
            price: 10,
          },
          {
            id_product: 2,
            amount: 2,
            price: 4.99,
          },
          {
            id_product: 3,
            amount: 2,
            price: 4.99,
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
    const shop = await factory.create('Shop');
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const solicitation = await factory.create('Solicitation', {
      id_shop: shop.id,
      id_user: user.id,
      id_table: null,
    });
    const response = await request(app)
      .delete(`/solicitations/${solicitation.id}`)
      .set({
        'x-access-token': user.generateToken(),
      });
    expect(response.status).toBe(200);
  });
  it('Deleta sem identificador', async () => {
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const response = await request(app).delete('/solicitations').set({
      'x-access-token': user.generateToken(),
    });
    expect(response.status).toBe(404);
  });
  it('Deleta com identificador inexistente', async () => {
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const response = await request(app).delete('/solicitations/5000').set({
      'x-access-token': user.generateToken(),
    });
    expect(response.status).toBe(401);
  });
});
