require('../../src/Model/database/index');
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest');
const database = require('../utils/truncate');
const factory = require('../factories');
const app = require('../../src/app');
const User = require('../../src/Model/database/models/Users');

beforeEach(async () => {
  await database.cleanDatabase();
});
describe('Recuperar', () => {
  it('Recupera com token', async () => {
    let user = await factory.create('User');
    user = await User.findByPk(user.id);
    const response = await request(app)
      .get('/users/solicitations')
      .set({
        'x-access-token': await user.generateToken(),
      });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/users/solicitations');
    expect(response.status).toBe(401);
  });
});
