require('../../src/Model/database/index');
const request = require('supertest');
const User = require('../../src/Model/database/models/Users');
const factory = require('../factories');
const app = require('../../src/app');
const database = require('../utils/truncate');

describe('Recuperar', () => {
  it('Recupera com token', async (done) => {
    await database.cleanDatabase();
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const response = await request(app).get('/users/shop_payments').set({
      'x-access-token': user.generateToken(),
    });
    await expect(response.status).toBe(200);
    done();
  });
  it('Recupera sem token', async (done) => {
    const response = await request(app).get('/users/shop_payments');
    await expect(response.status).toBe(401);
    done();
  });
});
