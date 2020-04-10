require('../../src/Model/database/index');
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest');
const database = require('../utils/truncate');
const factory = require('../factories');
const User = require('../../src/Model/database/models/Users');
const app = require('../../src/app');

describe('Recuperar', () => {
  it('Recupera com token', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const response = await request(app).get('/payment_methods/').set({
      'x-access-token': user.generateToken(),
    });
    await expect(response.status).toBe(200);
    done();
  });
  it('Recupera sem token', async (done) => {
    await database.cleanDatabase();
    const response = await request(app).get('/payment_methods/');
    await expect(response.status).toBe(401);
    done();
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const response = await request(app)
      .post('/payment_methods')
      .set({
        'x-access-token': user.generateToken(),
      })
      .send({
        description: '',
        id_payment_method_type: 1,
        id_card_flag: null,
      });
    await expect(response.status).toBe(400);
    done();
  });
  it('Grava com atributos válidos', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const response = await request(app)
      .post('/payment_methods')
      .set({
        'x-access-token': user.generateToken(),
      })
      .send({
        description: 'teste',
        id_payment_method_type: 1,
        id_card_flag: 2,
      });
    await expect(response.status).toBe(200);
    done();
  });
  it('Grava sem token', async (done) => {
    await database.cleanDatabase();
    const response = await request(app).post('/payment_methods').send({
      description: 'teste1',
      id_payment_method_type: 1,
      id_card_flag: 2,
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
    const payment_method = await factory.create('Payment_method');
    const response = await request(app)
      .put('/payment_methods')
      .send({
        id: payment_method.id,
        description: '',
        id_payment_method_type: null,
        id_card_flag: 2,
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
    user = await User.findByPk(user.id);
    const payment_method = await factory.create('Payment_method');
    const response = await request(app)
      .put('/payment_methods')
      .send({
        id: payment_method.id,
        description: 'teste5',
        id_payment_method_type: 1,
        id_card_flag: 2,
      })
      .set({
        'x-access-token': user.generateToken(),
      });
    await expect(response.status).toBe(200);
    done();
  });
  it('Atualiza sem token', async (done) => {
    await database.cleanDatabase();
    const payment_method = await factory.create('Payment_method');
    const response = await request(app).put('/payment_methods').send({
      id: payment_method.id,
      description: 'teste5',
      id_payment_method_type: 1,
      id_card_flag: 2,
    });
    await expect(response.status).toBe(401);
    done();
  });
});
describe('Deletar', () => {
  it('Deleta', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const payment_method = await factory.create('Payment_method');
    const response = await request(app)
      .delete(`/payment_methods/${payment_method.id}`)
      .set({
        'x-access-token': user.generateToken(),
      });
    await expect(response.status).toBe(200);
    done();
  });
  it('Deleta sem identificador', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const response = await request(app).delete('/payment_methods').set({
      'x-access-token': user.generateToken(),
    });
    await expect(response.status).toBe(404);
    done();
  });
  it('Deleta com identificador inexistente', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const response = await request(app).delete('/payment_methods/50').set({
      'x-access-token': user.generateToken(),
    });
    await expect(response.status).toBe(400);
    done();
  });
});
