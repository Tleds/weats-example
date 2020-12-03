require('../../src/Model/database/index');
const request = require('supertest');
const faker = require('faker-br');
const database = require('../utils/truncate');
const factory = require('../factories');
const User = require('../../src/Model/database/models/Users');
const app = require('../../src/app');

describe('Testando usuários', () => {
  describe('Recuperar', () => {
    it('Recupera com token', async () => {
      await database.cleanDatabase();
      let user = await factory.create('User');
      user = await User.findByPk(user.id);
      const response = await request(app)
        .get('/users')
        .set({
          'x-access-token': await user.generateToken(),
        });
      expect(response.status).toBe(200);
    });
    it('Recupera sem token', async () => {
      await database.cleanDatabase();
      const response = await request(app).get('/users');
      expect(response.status).toBe(401);
    });
  });
  describe('Gravar', () => {
    it('Grava com atributos vazios', async () => {
      await database.cleanDatabase();
      const response = await request(app).post('/users').send({
        name: 'usuário1 teste',
        email: 'usuario1@gmail.com',
        password: '',
        telephone: '3112345678',
        cellphone: '31912345678',
        cpf: '23819316000',
      });
      expect(response.status).toBe(400);
    });
    it('Grava com email inválido', async () => {
      await database.cleanDatabase();
      const response = await request(app).post('/users').send({
        name: faker.internet.userName(),
        email: 'testeusergmail.com',
        password: '12345678',
        telephone: '3112345678',
        cellphone: '31912345678',
        cpf: faker.br.cpf(),
      });
      expect(response.status).toBe(400);
    });
    it('Grava com cpf inválido', async () => {
      await database.cleanDatabase();
      const response = await request(app).post('/users').send({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cpf: '21819300000',
      });
      expect(response.status).toBe(400);
    });
    it('Grava com atributos válidos', async () => {
      await database.cleanDatabase();
      const response = await request(app).post('/users').send({
        name: 'usuário1 teste',
        email: 'usuario1@gmail.com',
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cpf: '04108433009',
      });
      expect(response.status).toBe(200);
    });
    it('Grava sem token', async () => {
      await database.cleanDatabase();
      const response = await request(app).post('/users').send({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cpf: faker.br.cpf(),
      });
      expect(response.status).toBe(200);
    });
  });
  describe('Atualizar', () => {
    it('Atualiza com atributos vazios', async () => {
      await database.cleanDatabase();
      let user = await factory.create('User');
      user = await User.findByPk(user.id);
      const response = await request(app)
        .put('/users')
        .send({
          name: '',
          telephone: '3112345678',
        })
        .set({
          'x-access-token': await user.generateToken(),
        });
      expect(response.status).toBe(400);
    });
    it('Atualiza com atributos válidos', async () => {
      await database.cleanDatabase();
      let user = await factory.create('User');
      user = await User.findByPk(user.id);
      const response = await request(app)
        .put('/users')
        .send({
          name: faker.internet.userName(),
          telephone: '3112345678',
        })
        .set({
          'x-access-token': await user.generateToken(),
        });
      expect(response.status).toBe(200);
    });
    it('Atualiza sem token', async () => {
      await database.cleanDatabase();
      const response = await request(app).put('/users').send({
        name: faker.internet.userName(),
        telephone: '3112345678',
      });
      expect(response.status).toBe(401);
    });
  });
  describe('Deletar', () => {
    it('Deleta', async () => {
      await database.cleanDatabase();
      let user = await factory.create('User');
      user = await User.findByPk(user.id);
      const response = await request(app).delete('/users').set({
        'x-access-token': user.generateToken(),
      });
      expect(response.status).toBe(200);
    });
    it('Deleta sem identificador', async () => {
      const response = await request(app).delete('/users');
      expect(response.status).toBe(401);
    });
  });
});
