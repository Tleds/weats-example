'use-strict';

const jwt = require('jsonwebtoken');
const repository_users = require('../Repository/users-repository');

module.exports = {
  async all() {
    const response = await repository_users.all();
    return response;
  },
  async showSolicitations(id_user) {
    const response = await repository_users.showSolicitations(id_user);
    return response;
  },
  async showShopPayments(id_user) {
    const response = await repository_users.showShopPayments(id);
    return response;
  },
  async showParkingPayments(id_user) {
    const response = await repository_users.showParkingPayments(id);
    return response;
  },
  async showProductRatings(id_user) {
    const response = await repository_users.showProductRatings(id);
    return response;
  },
  async showShopRatings(id_user) {
    const response = await repository_users.showShopRatings(id);
    return response;
  },
  async showPaymentMethods(id_user) {
    const response = await repository_users.showPaymentMethods(id);
    return response;
  },
  async create(user) {
    // Verificações
    // Verifica se o email já existe no banco de dados
    let response = await repository_users.validaEmailUser(user.email);
    if (!response.result) {
      return response;
    }
    // Verifica se o cpf já existe no banco de dados
    response = await repository_users.validaCpf(user.cpf);
    if (!response.result) {
      return response;
    }
    // Cria o usuário
    response = await repository_users.create(user);
    return response;
  },
  async update(user) {
    const response = await repository_users.update(user);
    return response;
  },
  async delete(id) {
    const response = await repository_users.delete(id);
    return response;
  },
  async verificalogin(user) {
    let response = await repository_users.verifica_login(user);
    if (!response.result) {
      return response;
    }
    response = { id: response.id, id_access: response.id_access };
    const token = jwt.sign({ response }, process.env.SECRET, {
      expiresIn: '365d',
    }); // 1 ano}
    return { message: 'Authenticated user', token, result: true };
  },
  async readById(id) {
    const response = await repository_users.readById(id);
    return response;
  },
};
