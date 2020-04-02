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
    const response = await request(app).get('/shoppings/');
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/shoppings');
    expect(response.status).toBe(401);
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async () => {
    const response = await request(app).post('/shoppings').send({
      name: 'shopping test',
      latitude: '-19.9746033',
      longitude: '',
      id_image: null,
    });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    const response = await request(app).post('/shoppings').send({
      name: 'shopping test',
      latitude: '-19.9746033',
      longitude: '-43.9436579',
      id_image: 1,
    });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    const response = await request(app).post('/shoppings').send({
      name: 'shopping test',
      latitude: '-19.9746033',
      longitude: '-43.9436579',
      id_image: 1,
    });
    expect(response.status).toBe(200);
  });
});
describe('Atualizar', () => {
  it('Atualiza com atributos vazios', async () => {
    const response = await request(app)
      .put('/shoppings')
      .send({
        name: 'shopping test',
        latitude: '',
        longitude: '-43.9436579',
        id_image: null,
      })
      .set({
        'x-access-token': session_shop.token,
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza com atributos válidos', async () => {
    const response = await request(app)
      .put('/shoppings')
      .send({
        name: 'shopping test1',
        latitude: '-19.9746031',
        longitude: '-43.9436572',
        id_image: 1,
      })
      .set({
        'x-access-token': session_shop.token,
      });
    expect(response.status).toBe(200);
  });
  it('Atualiza sem token', async () => {
    const response = await request(app).put({
      name: 'shopping test',
      latitude: '-19.9746033',
      longitude: '-43.9436579',
      id_image: 1,
    });
    expect(response.status).toBe(401);
  });
});
describe('Deletar', () => {
  it('Deleta', async () => {
    const response = await request(app).delete('/shoppings/1');
    expect(response.status).toBe(200);
  });
  it('Deleta sem identificador', async () => {
    const response = await request(app).delete('/shoppings');
    expect(response.status).toBe(401);
  });
  it('Deleta com identificador inexistente', async () => {
    const response = await request(app).delete('/shoppings/50');
    expect(response.status).toBe(400);
  });
});
