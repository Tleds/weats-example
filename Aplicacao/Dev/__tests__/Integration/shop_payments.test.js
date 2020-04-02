require('../../src/Model/database/index');
const request = require('supertest');

const app = require('../../src/app');

const session_user = request(app).post('/session_user').send({
  email: 'usuario@gmail.com',
  password: '123456789',
});

describe('Recuperar', () => {
  it('Recupera com token', async () => {
    const response = await request(app).get('/shop_payments/').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/shop_payments/');
    expect(response.status).toBe(401);
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async () => {
    const response = await request(app).post('/shop_payments').send({
      id_shop: 1,
      id_payment_method: 1,
      id_user: 1,
      id_table: 1,
      id_solicitation: null,
      final_price: null,
    });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    const response = await request(app).post('/shop_payments').send({
      id_shop: 1,
      id_payment_method: 1,
      id_user: 1,
      id_table: 1,
      id_solicitation: 1,
      final_price: 20.58,
    });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    const response = await request(app).post('/shop_payments').send({
      id_shop: 1,
      id_payment_method: 1,
      id_user: 1,
      id_table: 1,
      id_solicitation: null,
      final_price: 25.58,
    });
    expect(response.status).toBe(200);
  });
});
describe('Atualizar', () => {
  it('Atualiza com atributos vazios', async () => {
    const response = await request(app)
      .put('/shop_payments')
      .send({
        id: 1,
        id_shop: 1,
        id_payment_method: 1,
        id_user: 1,
        id_table: 1,
        id_solicitation: null,
        final_price: null,
      })
      .set({
        'x-access-token': session_user.token,
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza com atributos válidos', async () => {
    const response = await request(app)
      .put('/shop_payments')
      .send({
        id: 1,
        id_shop: 1,
        id_payment_method: 1,
        id_user: 1,
        id_table: 1,
        id_solicitation: 1,
        final_price: 23.58,
      })
      .set({
        'x-access-token': session_user.token,
      });
    expect(response.status).toBe(200);
  });
  it('Atualiza sem token', async () => {
    const response = await request(app).put({
      id: 1,
      id_shop: 1,
      id_payment_method: 1,
      id_user: 1,
      id_table: 1,
      id_solicitation: 1,
      final_price: 23.58,
    });
    expect(response.status).toBe(401);
  });
});
describe('Deletar', () => {
  it('Deleta', async () => {
    const response = await request(app).delete('/shop_payments/1').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(200);
  });
  it('Deleta sem identificador', async () => {
    const response = await request(app).delete('/shop_payments').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(401);
  });
  it('Deleta com identificador inexistente', async () => {
    const response = await request(app).delete('/shop_payments/50').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(400);
  });
});
