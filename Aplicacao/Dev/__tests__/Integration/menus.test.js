require('../../src/Model/database/index');
const request = require('supertest');
const Menus = require('../../src/Model/database/models/Menus');
const session_shop = require('../utils/getShopSession').session_shop();
const app = require('../../src/app');

describe('Recuperar', async () => {
  it('Recupera com token', async () => {
    const response = await request(app).get('/menus/1').set({
      'x-access-token': session_shop.token,
    });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/menus/1');
    expect(response.status).toBe(401);
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async () => {
    const response = await request(app)
      .post('/menus')
      .send({
        id_shop: 1,
        product: {
          name: '',
          price: 10.0,
          description: 'teste descrição',
          id_image: 5,
          id_classification: 1,
        },
      });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    const response = await request(app)
      .post('/menus')
      .send({
        id_shop: 1,
        product: {
          name: 'produto teste',
          price: 10.0,
          description: 'teste descrição',
          id_image: 5,
          id_classification: 2,
        },
      });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    const response = await request(app)
      .post('/menus')
      .send({
        id_shop: 1,
        product: {
          name: 'produto1 teste',
          price: 10.0,
          description: 'teste descrição',
          id_image: 5,
          id_classification: 1,
        },
      });
    expect(response.status).toBe(200);
  });
});
describe('Atualizar', () => {
  it('Atualiza com atributos vazios', async () => {
    const response = await request(app)
      .put('/menus')
      .set({
        'x-access-token': session_shop.token,
      })
      .send({
        id: 1,
        id_shop: 1,
        product: {
          name: '',
          price: 10.0,
          description: 'teste descrição',
          id_image: 5,
          id_classification: 1,
        },
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza com atributos válidos', async () => {
    const response = await request(app)
      .put('/menus')
      .set({
        'x-access-token': session_shop.token,
      })
      .send({
        id: 1,
        id_shop: 1,
        product: {
          name: 'produto2 teste',
          price: 10.0,
          description: 'teste descrição',
          id_image: 5,
          id_classification: 1,
        },
      });
    expect(response.status).toBe(200);
  });
  it('Atualiza sem token', async () => {
    const response = await request(app).put({
      id: 1,
      id_shop: 1,
      product: {
        name: '',
        price: 10.0,
        description: 'teste descrição',
        id_image: 5,
        id_classification: 1,
      },
    });
    expect(response.status).toBe(401);
  });
});
describe('Deletar', () => {
  it('Deleta', async () => {
    const response = await request(app).delete('/menus/1').set({
      'x-access-token': session_shop.token,
    });
    expect(response.status).toBe(200);
  });
  it('Deleta sem identificador', async () => {
    const response = await request(app).delete('/menus').set({
      'x-access-token': session_shop.token,
    });
    expect(response.status).toBe(401);
  });
  it('Deleta com identificador inexistente', async () => {
    const response = await request(app).delete('/menus/50').set({
      'x-access-token': session_shop.token,
    });
    expect(response.status).toBe(400);
  });
});
