require('../../src/Model/database/index');
const request = require('supertest');

const app = require('../../src/app');

describe('Gravar', () => {
  it('Grava com atributos vazios', async () => {
    const response = await request(app).post('/shopping_files').send({
      id_image: 1,
      name: 'profiler.png',
      path: '',
    });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    const response = await request(app).post('/shopping_files').send({
      id_image: 1,
      name: 'profiler.png',
      path: 'http://localhost.com/3000/1487923421364172.png',
    });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    const response = await request(app).post('/shopping_files').send({
      id_image: 1,
      name: 'profiler1.png',
      path: 'http://localhost.com/3000/14879234213641da72.png',
    });
    expect(response.status).toBe(200);
  });
});
