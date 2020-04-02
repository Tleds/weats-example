require('../../src/Model/database/index');
const request = require('supertest');
const database = require('../utils/truncate');
const Shop = require('../../src/Model/database/models/Shops');
const factory = require('../factories');
const app = require('../../src/app');
// const connection = require('../../src/Model/database/index');

beforeAll(() => {
  return database.cleanDatabase();
});
describe('Recuperar', () => {
  it('Recupera com token', async (done) => {
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, {
      attributes: ['id', 'id_access'],
    });
    const response = await request(app).get('/shops/tables').set({
      'x-access-token': shop.generateToken(),
    });
    await expect(response.status).toBe(200);
    await done();
  });
  it('Recupera sem token', async (done) => {
    const response = await request(app).get('/shops/tables');
    await expect(response.status).toBe(401);
    await done();
  });
});
