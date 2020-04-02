require('../../src/Model/database/index');
const request = require('supertest');
const Users = require('../../src/Model/database/models/Users');
const session_user = require('../utils/getUserSession');
const app = require('../../src/app');

afterAll(() => {
  Users.truncate();
});
describe('Recuperar', () => {
  it('Recupera com token', async () => {
    const response = await request(app)
      .get('/shoppings/shopping_promotions')
      .set({
        'x-access-token': session_user.token,
      });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/shoppings/shopping_promotions');
    expect(response.status).toBe(401);
  });
});
