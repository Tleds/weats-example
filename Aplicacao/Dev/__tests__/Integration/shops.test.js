require('../../src/Model/database/index');
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const request = require('supertest');
const faker = require('faker-br');
const database = require('../utils/truncate');
const factory = require('../factories');
const Shop = require('../../src/Model/database/models/Shops');
const app = require('../../src/app');

describe('Recuperar', () => {
  it('Recupera com token', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const response = await request(app)
      .get('/shops')
      .set({
        'x-access-token': await shop.generateToken(),
      });
    expect(response.status).toBe(200);
    done();
  });
  it('Recupera sem token', async (done) => {
    await database.cleanDatabase();
    const response = await request(app).get('/shops');
    await expect(response.status).toBe(401);
    done();
  });
  it('Recupera todas as lojas do shopping com token', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const response = await request(app)
      .get(`/${shopping.id}/shops`)
      .set({
        'x-access-token': await shop.generateToken(),
      });
    await expect(response.status).toBe(200);
    done();
  });
  it('Recupera todas as lojas do shopping sem token', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const response = await request(app).get(`/${shopping.id}/shops`);
    await expect(response.status).toBe(401);
    done();
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async () => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    const response = await request(app)
      .post('/shops')
      .send({
        id_shopping: shopping.id,
        id_shop_type: shop_type.id,
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: '',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: faker.br.cnpj(),
        address: {
          street: faker.address.streetName(),
          number: 800,
          complement: '',
          neighborhood: faker.address.streetName(),
          city: faker.address.city(),
          zip_code: '71680613',
          state: faker.address.state(),
          country: faker.address.country(),
        },
      });
    expect(response.status).toBe(400);
  });
  it('Grava com email inválido', async () => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    const response = await request(app)
      .post('/shops')
      .send({
        id_shopping: shopping.id,
        id_shop_type: shop_type.id,
        name: faker.internet.userName(),
        email: 'testeadcad.com',
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: faker.br.cnpj(),
        address: {
          street: faker.address.streetName(),
          number: 800,
          complement: '',
          neighborhood: faker.address.streetName(),
          city: faker.address.city(),
          zip_code: '71680613',
          state: faker.address.state(),
          country: faker.address.country(),
        },
      });
    expect(response.status).toBe(400);
  });
  it('Grava com cnpj inválido', async () => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    const response = await request(app)
      .post('/shops')
      .send({
        id_shopping: shopping.id,
        id_shop_type: shop_type.id,
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: '35447946543154',
        address: {
          street: faker.address.streetName(),
          number: 800,
          complement: '',
          neighborhood: faker.address.streetName(),
          city: faker.address.city(),
          zip_code: '71680613',
          state: faker.address.state(),
          country: faker.address.country(),
        },
      });
    expect(response.status).toBe(400);
  });
  it('Grava com cep inválido', async () => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    const response = await request(app)
      .post('/shops')
      .send({
        id_shopping: shopping.id,
        id_shop_type: shop_type.id,
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: faker.br.cnpj(),
        address: {
          street: faker.address.streetName(),
          number: 800,
          complement: '',
          neighborhood: faker.address.streetName(),
          city: faker.address.city(),
          zip_code: '12345678',
          state: faker.address.state(),
          country: faker.address.country(),
        },
      });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    const response = await request(app)
      .post('/shops')
      .send({
        id_shopping: shopping.id,
        id_shop_type: shop_type.id,
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: faker.br.cnpj(),
        address: {
          street: faker.address.streetName(),
          number: 800,
          complement: '',
          neighborhood: faker.address.streetName(),
          city: faker.address.city(),
          zip_code: '71680613',
          state: faker.address.state(),
          country: faker.address.country(),
        },
      });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    const response = await request(app)
      .post('/shops')
      .send({
        id_shopping: shopping.id,
        id_shop_type: shop_type.id,
        name: faker.internet.userName(),
        cnpj: faker.br.cnpj(),
        email: faker.internet.email(),
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        address: {
          street: faker.address.streetName(),
          number: 800,
          complement: '',
          neighborhood: faker.address.streetName(),
          city: faker.address.city(),
          zip_code: '71680613',
          state: faker.address.state(),
          country: faker.address.country(),
        },
      });
    expect(response.status).toBe(200);
  });
  it('Grava sem endereço', async () => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    const response = await request(app).post('/shops').send({
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: '123456789',
      telephone: '3112345678',
      cellphone: '31912345678',
      cnpj: '35447946543',
    });
    expect(response.status).toBe(400);
  });
});
describe('Atualizar', () => {
  it('Atualiza com atributos vazios', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const response = await request(app)
      .put('/shops')
      .send({
        id: shop.id,
        id_shopping: shopping.id,
        id_shop_type: shop_type.id,
        name: '',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: faker.br.cnpj(),
        address: {
          street: faker.address.streetName(),
          number: 800,
          complement: '',
          neighborhood: faker.address.streetName(),
          city: faker.address.city(),
          zip_code: '',
          state: faker.address.state(),
          country: faker.address.country(),
        },
      })
      .set({
        'x-access-token': await shop.generateToken(),
      });
    expect(response.status).toBe(400);
    done();
  });
  it('Atualiza com email inválido', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const response = await request(app)
      .put('/shops')
      .send({
        id: shop.id,
        id_shopping: shopping.id,
        id_shop_type: shop_type.id,
        cnpj: faker.br.cnpj(),
        email: 'teste.com',
        name: faker.internet.userName(),
        telephone: '3112345678',
        cellphone: '31912345678',
        address: {
          street: faker.address.streetName(),
          number: 800,
          complement: '',
          neighborhood: faker.address.streetName(),
          city: faker.address.city(),
          zip_code: '71680613',
          state: faker.address.state(),
          country: faker.address.country(),
        },
      })
      .set({
        'x-access-token': await shop.generateToken(),
      });
    await expect(response.status).toBe(400);
    done();
  });
  it('Atualiza com cep inválido', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const response = await request(app)
      .put('/shops')
      .send({
        id: shop.id,
        id_shopping: shopping.id,
        id_shop_type: shop_type.id,
        cnpj: faker.br.cnpj(),
        email: 'teste.com',
        name: faker.internet.userName(),
        telephone: '3112345678',
        cellphone: '31912345678',
        address: {
          street: faker.address.streetName(),
          number: 800,
          complement: '',
          neighborhood: faker.address.streetName(),
          city: faker.address.city(),
          zip_code: '12345678',
          state: faker.address.state(),
          country: faker.address.country(),
        },
      })
      .set({
        'x-access-token': await shop.generateToken(),
      });
    await expect(response.status).toBe(400);
    done();
  });
  it('Atualiza com atributos válidos', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const response = await request(app)
      .put('/shops')
      .send({
        id: shop.id,
        id_shopping: shopping.id,
        id_shop_type: shop_type.id,
        email: faker.internet.email(),
        cnpj: faker.br.cnpj(),
        name: faker.internet.userName(),
        telephone: '3112345678',
        cellphone: '31912345678',
        address: {
          street: faker.address.streetName(),
          number: 800,
          complement: '',
          neighborhood: faker.address.streetName(),
          city: faker.address.city(),
          zip_code: '71680613',
          state: faker.address.state(),
          country: faker.address.country(),
        },
      })
      .set({
        'x-access-token': await shop.generateToken(),
      });
    await expect(response.status).toBe(200);
    done();
  });
  it('Atualiza sem token', async (done) => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const response = await request(app)
      .put('/shops')
      .send({
        id: shop.id,
        id_shopping: shopping.id,
        id_shop_type: shop_type.id,
        cnpj: faker.br.cnpj(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        telephone: '3112345678',
        cellphone: '31912345678',
        address: {
          street: faker.address.streetName(),
          number: 800,
          complement: '',
          neighborhood: faker.address.streetName(),
          city: faker.address.city(),
          zip_code: '71680613',
          state: faker.address.state(),
          country: faker.address.country(),
        },
      });
    await expect(response.status).toBe(401);
    done();
  });
});
describe('Deletar', () => {
  it('Deleta', async () => {
    await database.cleanDatabase();
    const shopping = await factory.create('Shopping');
    const shop_type = await factory.create('Shop_type');
    let shop = await factory.create('Shop', {
      id_shopping: shopping.id,
      id_shop_type: shop_type.id,
    });
    shop = await Shop.findByPk(shop.id, { attributes: ['id', 'id_access'] });
    const response = await request(app)
      .delete('/shops')
      .set({
        'x-access-token': await shop.generateToken(),
      });
    expect(response.status).toBe(200);
  });
  it('Deleta sem identificador', async () => {
    const response = await request(app).delete('/shops');
    expect(response.status).toBe(401);
  });
});
