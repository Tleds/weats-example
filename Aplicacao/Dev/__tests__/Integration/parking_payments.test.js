require('../../src/Model/database/index');
const request = require('supertest');

const app = require('../../src/app');

const session_user = request(app).post('/session_user').send({
  email: 'usuario@gmail.com',
  password: '123456789',
});

describe('Recuperar', () => {
  it('Recupera com token', async () => {
    const response = await (await request(app).get('/parking_payments/')).set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/parking_payments/');
    expect(response.status).toBe(401);
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async () => {
    const response = await request(app).post('/parking_payments').send({
      id_shop: 1,
      id_payment_method: 1,
      id_user: 1,
      card_code: '',
      final_price: 12.0,
    });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    const response = await request(app).post('/parking_payments').send({
      id_shop: 1,
      id_payment_method: 1,
      id_user: 1,
      card_code: '1334845561lkjgbasfdsa',
      final_price: 12.0,
    });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    const response = await request(app).post('/parking_payments').send({
      id_shop: 1,
      id_payment_method: 1,
      id_user: 1,
      card_code: '1334845561lkjdasgbasfdsa',
      final_price: 12.0,
    });
    expect(response.status).toBe(200);
  });
});
describe('Deletar', () => {
  it('Deleta', async () => {
    const response = await (
      await request(app).delete('/parking_payments/1')
    ).set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(200);
  });
  it('Deleta sem identificador', async () => {
    const response = await (await request(app).delete('/parking_payments')).set(
      {
        'x-access-token': session_user.token,
      }
    );
    expect(response.status).toBe(401);
  });
  it('Deleta com identificador inexistente', async () => {
    const response = await (
      await request(app).delete('/parking_payments/50')
    ).set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(400);
  });
});
