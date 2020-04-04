const bc = require('bcrypt');
const repository_shop = require('../Repository/shops-repository');

module.exports = {
  async all(id_shopping) {
    const response = await repository_shop.all(id_shopping);
    return response;
  },
  async readById(id) {
    const response = await repository_shop.readById(id);
    return response;
  },
  async create(shop) {
    let response = await repository_shop.validaEmail(shop.email);
    if (!response.result) {
      return response;
    }
    response = await repository_shop.validaCNPJ(shop.cnpj);
    if (!response.result) {
      return response;
    }
    response = await repository_shop.create(shop);
    return response;
  },
  async update(shop) {
    const response = await repository_shop.update(shop);
    return response;
  },
  async delete(id) {
    const response = await repository_shop.delete(id);
    return response;
  },
  async validaEmail(email) {
    const response = await repository_shop.validaEmail(email);
    return response;
  },
  async validaCNPJ(cnpj) {
    const response = await repository_shop.validaCNPJ(cnpj);
    return response;
  },
};
