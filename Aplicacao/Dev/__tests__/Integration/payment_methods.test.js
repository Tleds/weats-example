require('../../src/Model/database/index');
const request = require('supertest');

const app = require('../../src/app');

const session_user = request(app).post('/session_user').send({
  email: 'usuario@gmail.com',
  password: '123456789',
});

describe('Recuperar', () => {
  it('Recupera com token', async () => {
    const response = await request(app).get('/payment_methods/').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/payment_methods/');
    expect(response.status).toBe(401);
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async () => {
    const response = await request(app).post('/payment_methods').send({
      description: '',
      payment_method_type: 1,
      card_flag: null,
    });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    const response = await request(app).post('/payment_methods').send({
      description: 'teste',
      payment_method_type: 1,
      card_flag: 2,
    });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    const response = await request(app).post('/payment_methods').send({
      description: 'teste1',
      payment_method_type: 1,
      card_flag: 2,
    });
    expect(response.status).toBe(200);
  });
});
describe('Atualizar', () => {
  it('Atualiza com atributos vazios', async () => {
    const response = await request(app)
      .put('/payment_methods')
      .send({
        id: 1,
        description: '',
        payment_method_type: null,
        card_flag: 2,
      })
      .set({
        'x-access-token': session_user.token,
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza com atributos válidos', async () => {
    const response = await request(app)
      .put('/payment_methods')
      .send({
        id: 1,
        description: 'teste5',
        payment_method_type: 1,
        card_flag: 2,
      })
      .set({
        'x-access-token': session_user.token,
      });
    expect(response.status).toBe(200);
  });
  it('Atualiza sem token', async () => {
    const response = await request(app).put({
      id: 1,
      description: 'teste5',
      payment_method_type: 1,
      card_flag: 2,
    });
    expect(response.status).toBe(401);
  });
});
describe('Deletar', () => {
  it('Deleta', async () => {
    const response = await request(app).delete('/payment_methods/1').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(200);
  });
  it('Deleta sem identificador', async () => {
    const response = await request(app).delete('/payment_methods').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(401);
  });
  it('Deleta com identificador inexistente', async () => {
    const response = await request(app).delete('/payment_methods/50').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(400);
  });
});
