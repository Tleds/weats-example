require('../../src/Model/database/index');
const request = require('supertest');

const app = require('../../src/app');

const session_user = request(app).post('/session_user').send({
  email: 'usuario@gmail.com',
  password: '123456789',
});

describe('Recuperar', () => {
  it('Recupera com token', async () => {
    const response = await request(app).get('/solicitations/1').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/solicitations/1');
    expect(response.status).toBe(401);
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async () => {
    const response = await request(app)
      .post('/solicitations')
      .send({
        id_shop: 1,
        id_user: 1,
        id_table: 1,
        price: 18.98,
        solicitation_password: '',
        solicitation_item: {
          id_product: 1,
          amount: 2,
          observation: '',
        },
      });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    const response = await request(app)
      .post('/solicitations')
      .send({
        id_shop: 1,
        id_user: 1,
        id_table: 1,
        price: 18.98,
        solicitation_password: 155648,
        solicitation_item: {
          id_product: 1,
          amount: 2,
          observation: '',
        },
      });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    const response = await request(app)
      .post('/solicitations')
      .send({
        id_shop: 1,
        id_user: 1,
        id_table: 1,
        price: 18.98,
        solicitation_password: 156489,
        solicitation_item: {
          id_product: 1,
          amount: 2,
          observation: '',
        },
      });
    expect(response.status).toBe(200);
  });
});
describe('Atualizar', () => {
  it('Atualiza com atributos vazios', async () => {
    const response = await request(app)
      .put('/solicitations')
      .send({
        id: 1,
        id_shop: 1,
        id_user: 1,
        id_table: 1,
        price: 8.99,
        solicitation_password: '',
        solicitation_item: {
          id_product: 1,
          amount: 2,
          observation: '',
        },
      })
      .set({
        'x-access-token': session_user.token,
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza com atributos válidos', async () => {
    const response = await request(app)
      .put('/solicitations')
      .send({
        id: 1,
        id_shop: 1,
        id_user: 1,
        id_table: 1,
        price: 8.99,
        solicitation_password: 12354,
        solicitation_item: {
          id_product: 1,
          amount: 2,
          observation: '',
        },
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
      id_user: 1,
      id_table: 1,
      price: 8.99,
      solicitation_password: 156432,
      solicitation_item: {
        id_product: 1,
        amount: 2,
        observation: '',
      },
    });
    expect(response.status).toBe(401);
  });
});
describe('Deletar', () => {
  it('Deleta', async () => {
    const response = await request(app).delete('/solicitations/1').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(200);
  });
  it('Deleta sem identificador', async () => {
    const response = await request(app).delete('/solicitations').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(401);
  });
  it('Deleta com identificador inexistente', async () => {
    const response = await request(app).delete('/solicitations/50').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(400);
  });
});
