const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/Model/database/models/Users');

module.exports = {
  async session_user() {
    await User.destroy({ truncate: { cascade: true }, restartIdentity: true });
    await User.create({
      name: 'usuário teste',
      email: 'usuario@gmail.com',
      password: '123456789',
      telephone: '3112345678',
      cellphone: '31912345678',
      cpf: '23819316000',
    }).catch((e) => {
      console.log(e);
    });
    const response = await request(app).post('/session_user').send({
      email: 'usuario@gmail.com',
      password: '123456789',
    });
    return response;
  },
};
