require('../../src/Model/database/index');
const request = require('supertest');
const Shoppings = require('../../src/Model/database/models/Shoppings');
const session_shop = require('../utils/getShopSession');

const app = require('../../src/app');

afterAll(() => {
  Shoppings.truncate();
});
describe('Recuperar', () => {
  it('Recupera com token', async () => {
    const response = await request(app).get('/shops/shop_ratings/');
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/shops/shop_ratings');
    expect(response.status).toBe(401);
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async () => {
    const response = await request(app).post('/shops/shop_ratings').send({
      id_shop: 1,
      id_user: 1,
      description: '',
      rating: null,
    });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    const response = await request(app).post('/shops/shop_ratings').send({
      id_shop: 1,
      id_user: 1,
      description: 'descrição teste',
      rating: 4.2,
    });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    const response = await request(app).post('/shops/shop_ratings').send({
      id_shop: 1,
      id_user: 1,
      description: 'descrição teste',
      rating: 4.2,
    });
    expect(response.status).toBe(200);
  });
});
describe('Atualizar', () => {
  it('Atualiza com atributos vazios', async () => {
    const response = await request(app)
      .put('/shops/shop_ratings')
      .send({
        id: 1,
        id_shop: 1,
        id_user: 1,
        description: '',
        rating: null,
      })
      .set({
        'x-access-token': session_shop.token,
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza com atributos válidos', async () => {
    const response = await request(app)
      .put('/shops/shop_ratings')
      .send({
        id: 1,
        id_shop: 1,
        id_user: 1,
        description: '',
        rating: 3.2,
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
      id_user: 1,
      description: '',
      rating: 4.2,
    });
    expect(response.status).toBe(401);
  });
});
describe('Deletar', () => {
  it('Deleta', async () => {
    const response = await request(app).delete('/shops/shop_ratings/1');
    expect(response.status).toBe(200);
  });
  it('Deleta sem identificador', async () => {
    const response = await request(app).delete('/shops/shop_ratings');
    expect(response.status).toBe(401);
  });
  it('Deleta com identificador inexistente', async () => {
    const response = await request(app).delete('/shops/shop_ratings/50');
    expect(response.status).toBe(400);
  });
});
