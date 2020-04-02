require('../../src/Model/database/index');
const request = require('supertest');

const app = require('../../src/app');

const session_shop = request(app).post('/session_shops').send({
  email: 'loja@gmail.com',
  password: '123456789',
});

describe('Recuperar', () => {
  it('Recupera com token', async () => {
    const response = await request(app).get('/tables/1').set({
      'x-access-token': session_shop.token,
    });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/tables');
    expect(response.status).toBe(401);
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async () => {
    const response = await request(app).post('/tables').send({
      id_shop: 1,
      description: '',
    });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    const response = await request(app).post('/tables').send({
      id_shop: 1,
      description: 'mesa1 teste',
    });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    const response = await request(app).post('/tables').send({
      id_shop: 1,
      description: 'mesa2 teste',
    });
    expect(response.status).toBe(200);
  });
});
describe('Atualizar', () => {
  it('Atualiza com atributos vazios', async () => {
    const response = await request(app)
      .put('/tables')
      .send({
        id: 1,
        id_shop: 1,
        description: '',
      })
      .set({
        'x-access-token': session_shop.token,
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza com atributos válidos', async () => {
    const response = await request(app)
      .put('/tables')
      .send({
        id: 1,
        id_shop: 1,
        description: 'mesa5 teste',
      })
      .set({
        'x-access-token': session_shop.token,
      });
    expect(response.status).toBe(200);
  });
  it('Atualiza sem token', async () => {
    const response = await request(app).put({
      id: 1,
      id_shop: 1,
      description: 'mesa5 teste',
    });
    expect(response.status).toBe(401);
  });
});
describe('Deletar', () => {
  it('Deleta', async () => {
    const response = await request(app).delete('/tables/1').set({
      'x-access-token': session_shop.token,
    });
    expect(response.status).toBe(200);
  });
  it('Deleta sem identificador', async () => {
    const response = await request(app).delete('/tables').set({
      'x-access-token': session_shop.token,
    });
    expect(response.status).toBe(401);
  });
  it('Deleta com identificador inexistente', async () => {
    const response = await request(app).delete('/tables/50').set({
      'x-access-token': session_shop.token,
    });
    expect(response.status).toBe(400);
  });
});
