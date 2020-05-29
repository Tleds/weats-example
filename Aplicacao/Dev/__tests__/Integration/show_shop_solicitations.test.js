require('../../src/Model/database/index');
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest');
const database = require('../utils/truncate');
const factory = require('../factories');
const Shop = require('../../src/Model/database/models/Shops');
const app = require('../../src/app');

beforeEach(async () => {
  await database.cleanDatabase();
});
describe('Recuperar', () => {
  it('Recupera com token', async () => {
    let shop = await factory.create('Shop');
    shop = await Shop.findByPk(shop.id);
    const response = await request(app)
      .get('/shops/solicitations')
      .set({
        'x-access-token': await shop.generateToken(),
      });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/shops/solicitations');
    expect(response.status).toBe(401);
  });
});
