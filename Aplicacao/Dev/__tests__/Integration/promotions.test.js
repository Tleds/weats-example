require('../../src/Model/database/index');
const request = require('supertest');

const app = require('../../src/app');

const session_user = request(app).post('/session_user').send({
  email: 'loja@gmail.com',
  password: '123456789',
});

describe('Recuperar', () => {
  it('Recupera com token', async () => {
    const response = await request(app).get('/promotions/').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/promotions/');
    expect(response.status).toBe(401);
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async () => {
    const response = await request(app).post('/promotions').send({
      promotion_title: 'teste promoção',
      description: 'teste descrição promoção',
      start_date: '20/01/2020 00:00:00',
      end_date: '',
      coupon: 'TEST',
    });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    const response = await request(app).post('/promotions').send({
      promotion_title: 'teste promoção',
      description: 'teste descrição promoção',
      start_date: '20/01/2020 00:00:00',
      end_date: '20/02/2020 00:00:00',
      coupon: 'TEST',
    });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    const response = await request(app).post('/promotions').send({
      promotion_title: 'teste1 promoção',
      description: 'teste1 descrição promoção',
      start_date: '20/01/2020 00:00:00',
      end_date: '20/02/2020 00:00:00',
      coupon: 'TEST1',
    });
    expect(response.status).toBe(200);
  });
});
describe('Atualizar', () => {
  it('Atualiza com atributos vazios', async () => {
    const response = await request(app)
      .put('/promotions')
      .send({
        id: 1,
        promotion_title: 'teste3 promoção',
        description: 'teste3 descrição promoção',
        start_date: '20/01/2020 00:00:00',
        end_date: '',
        coupon: 'TEST3',
      })
      .set({
        'x-access-token': session_user.token,
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza com atributos válidos', async () => {
    const response = await request(app)
      .put('/promotions')
      .send({
        id: 1,
        promotion_title: 'teste4 promoção',
        description: 'teste4 descrição promoção',
        start_date: '20/01/2020 00:00:00',
        end_date: '20/02/2020 00:00:00',
        coupon: 'TEST4',
      })
      .set({
        'x-access-token': session_user.token,
      });
    expect(response.status).toBe(200);
  });
  it('Atualiza sem token', async () => {
    const response = await request(app).put({
      id: 1,
      promotion_title: 'teste promoção',
      description: 'teste descrição promoção',
      start_date: '20/01/2020 00:00:00',
      end_date: '20/02/2020 00:00:00',
      coupon: 'TEST',
    });
    expect(response.status).toBe(401);
  });
});
describe('Deletar', () => {
  it('Deleta', async () => {
    const response = await request(app).delete('/promotions/1').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(200);
  });
  it('Deleta sem identificador', async () => {
    const response = await request(app).delete('/promotions').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(401);
  });
  it('Deleta com identificador inexistente', async () => {
    const response = await request(app).delete('/promotions/50').set({
      'x-access-token': session_user.token,
    });
    expect(response.status).toBe(400);
  });
});
