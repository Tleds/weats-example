require('../../src/Model/database/index');
const request = require('supertest');
const User = require('../../src/Model/database/models/Users');
const connection = require('../../src/Model/database/index');

const app = require('../../src/app');

afterAll(async () => {
  await connection.close();
});
describe('Authentication with JWT', () => {
  beforeAll(async () => {
    await User.destroy({ truncate: { cascade: true } });
    await User.create({
      name: 'usuário teste',
      email: 'usuario@gmail.com',
      password: '123456789',
      telephone: '3112345678',
      cellphone: '31912345678',
      cpf: '23819316000',
    });
  });

  it('Cria uma sessão com credenciais nulas', async () => {
    const response = await request(app).post('/session_user').send({
      email: '',
      password: '',
    });
    expect(response.status).toBe(400);
  });
  it('Cria uma sessão com email inválido', async () => {
    const response = await request(app).post('/session_user').send({
      email: 'teste@invalido.com',
      password: '123456789',
    });
    expect(response.status).toBe(400);
  });
  it('Cria uma sessão com senha inválida', async () => {
    const response = await request(app).post('/session_user').send({
      email: 'usuario@gmail.com',
      password: '123456312',
    });
    expect(response.status).toBe(400);
  });
  it('Cria uma sessão com credenciais válidas', async () => {
    const response = await request(app).post('/session_user').send({
      email: 'usuario@gmail.com',
      password: '123456789',
    });
    expect(response.status).toBe(200);
  });
});
