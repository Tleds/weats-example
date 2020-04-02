require('../../src/Model/database/index');
const request = require('supertest');
const Shops = require('../../src/Model/database/models/Shops');
const session_shop = require('../utils/getShopSession');
const app = require('../../src/app');

afterAll(() => {
  Shops.truncate();
});
describe('Recuperar', () => {
  it('Recupera com token', async () => {
    const response = await request(app)
      .get('/shops/accept_payment_methods/1')
      .set({
        'x-access-token': session_shop.token,
      });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/shops/accept_payment_methods/1');
    expect(response.status).toBe(401);
  });
  it('Recupera sem identificador', async () => {
    const response = await request(app)
      .get('/shops/accept_payment_methods')
      .set({
        'x-access-token': session_shop.token,
      });
    expect(response.status).toBe(401);
  });
});
