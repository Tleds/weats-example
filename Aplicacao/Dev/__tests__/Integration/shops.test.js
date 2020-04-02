require('../../src/Model/database/index');
const request = require('supertest');
const Shops = require('../../src/Model/database/models/Shops');
const session_shop = require('../utils/getShopSession');
const app = require('../../src/app');

describe('Recuperar', () => {
  it('Recupera com token', async () => {
    const response = await request(app).get('/shops').set({
      'x-access-token': session_shop.token,
    });
    expect(response.status).toBe(200);
  });
  it('Recupera sem token', async () => {
    const response = await request(app).get('/shops');
    expect(response.status).toBe(401);
  });
});
describe('Gravar', () => {
  it('Grava com atributos vazios', async () => {
    const response = await request(app)
      .post('/shops')
      .send({
        name: 'loja teste',
        email: 'loja@gmail.com',
        password: '',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: '23819316000',
        address: {
          street: 'rua teste',
          number: 800,
          complement: 'complemento teste',
          neighborhood: 'bairro teste',
          city: 'cidade teste',
          zip_code: '12345678',
          state: 'MG',
          country: 'Brasil',
        },
      });
    expect(response.status).toBe(400);
  });
  it('Grava com email inválido', async () => {
    const response = await request(app)
      .post('/shops')
      .send({
        name: 'loja teste',
        email: 'loja.com',
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: '23819316000',
        address: {
          street: 'rua teste',
          number: 800,
          complement: 'complemento teste',
          neighborhood: 'bairro teste',
          city: 'cidade teste',
          zip_code: '12345678',
          state: 'MG',
          country: 'Brasil',
        },
      });
    expect(response.status).toBe(400);
  });
  it('Grava com cpf inválido', async () => {
    const response = await request(app)
      .post('/shops')
      .send({
        name: 'loja teste',
        email: 'loja@gmail.com',
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: '23810016000',
        address: {
          street: 'rua teste',
          number: 800,
          complement: 'complemento teste',
          neighborhood: 'bairro teste',
          city: 'cidade teste',
          zip_code: '12345678',
          state: 'MG',
          country: 'Brasil',
        },
      });
    expect(response.status).toBe(400);
  });
  it('Grava com atributos válidos', async () => {
    const response = await request(app)
      .post('/shops')
      .send({
        name: 'loja1 teste',
        email: 'loja1@gmail.com',
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: '69499989000126',
        address: {
          street: 'rua teste',
          number: 800,
          complement: 'complemento teste',
          neighborhood: 'bairro teste',
          city: 'cidade teste',
          zip_code: '12345678',
          state: 'MG',
          country: 'Brasil',
        },
      });
    expect(response.status).toBe(200);
  });
  it('Grava sem token', async () => {
    const response = await request(app)
      .post('/shops')
      .send({
        name: 'loja2 teste',
        email: 'loja2@gmail.com',
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: '65366997000143',
        address: {
          street: 'rua teste',
          number: 800,
          complement: 'complemento teste',
          neighborhood: 'bairro teste',
          city: 'cidade teste',
          zip_code: '12345678',
          state: 'MG',
          country: 'Brasil',
        },
      });
    expect(response.status).toBe(200);
  });
  it('Grava sem endereço', async () => {
    const response = await request(app).post('/shops').send({
      name: 'loja1 teste',
      email: 'loja1@gmail.com',
      password: '123456789',
      telephone: '3112345678',
      cellphone: '31912345678',
      cnpj: '69499989000126',
    });
    expect(response.status).toBe(200);
  });
});
describe('Atualizar', () => {
  it('Atualiza com atributos vazios', async () => {
    const response = await request(app)
      .put('/shops')
      .send({
        name: 'loja3 teste',
        email: 'loja3@gmail.com',
        password: '',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: '01237376000187',
        address: {
          street: 'rua teste',
          number: 800,
          complement: 'complemento teste',
          neighborhood: 'bairro teste',
          city: 'cidade teste',
          zip_code: '12345678',
          state: 'MG',
          country: 'Brasil',
        },
      })
      .set({
        'x-access-token': session_shop.token,
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza com email inválido', async () => {
    const response = await request(app)
      .put('/shops')
      .send({
        name: 'loja3 teste',
        email: 'loja3.com',
        password: '123465789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: '01237376000187',
        address: {
          street: 'rua teste',
          number: 800,
          complement: 'complemento teste',
          neighborhood: 'bairro teste',
          city: 'cidade teste',
          zip_code: '12345678',
          state: 'MG',
          country: 'Brasil',
        },
      })
      .set({
        'x-access-token': session_shop.token,
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza com cnpj inválido', async () => {
    const response = await request(app)
      .put('/shops')
      .send({
        name: 'loja3 teste',
        email: 'loja3@gmail.com',
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: '01230006000187',
        address: {
          street: 'rua teste',
          number: 800,
          complement: 'complemento teste',
          neighborhood: 'bairro teste',
          city: 'cidade teste',
          zip_code: '12345678',
          state: 'MG',
          country: 'Brasil',
        },
      })
      .set({
        'x-access-token': session_shop.token,
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza com atributos válidos', async () => {
    const response = await request(app)
      .put('/shops')
      .send({
        name: 'loja3 teste',
        email: 'loja3@gmail.com',
        password: '123456789',
        telephone: '3112345678',
        cellphone: '31912345678',
        cnpj: '01237376000187',
        address: {
          street: 'rua teste',
          number: 800,
          complement: 'complemento teste',
          neighborhood: 'bairro teste',
          city: 'cidade teste',
          zip_code: '12345678',
          state: 'MG',
          country: 'Brasil',
        },
      })
      .set({
        'x-access-token': session_shop.token,
      });
    expect(response.status).toBe(400);
  });
  it('Atualiza sem token', async () => {
    const response = await request(app).put({
      name: 'loja3 teste',
      email: 'loja3@gmail.com',
      password: '',
      telephone: '3112345678',
      cellphone: '31912345678',
      cnpj: '01237376000187',
      address: {
        street: 'rua teste',
        number: 800,
        complement: 'complemento teste',
        neighborhood: 'bairro teste',
        city: 'cidade teste',
        zip_code: '12345678',
        state: 'MG',
        country: 'Brasil',
      },
    });
    expect(response.status).toBe(401);
  });
});
describe('Deletar', () => {
  it('Deleta', async () => {
    const response = await request(app).delete('/shops').set({
      'x-access-token': session_shop.token,
    });
    expect(response.status).toBe(200);
  });
  it('Deleta sem identificador', async () => {
    const response = await request(app).delete('/shops');
    expect(response.status).toBe(401);
  });
  it('Deleta com identificador inexistente', async () => {
    const response = await request(app).delete('/shops').set({
      'x-access-token': session_shop.token,
    });
    expect(response.status).toBe(400);
  });
});
