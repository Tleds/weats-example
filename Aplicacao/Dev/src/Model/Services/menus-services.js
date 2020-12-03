'use-strict';

const repository_menus = require('../Repository/menus-repository');
// const repository_restaurantes = require('../Repository/restaurantes-repository')

module.exports = {
  // async validateShop(id_shop) {
  //   const response = await repository_restaurantes.readById(id_shop);
  //   return response;
  // },
  async all(id_shop) {
    const response = await repository_menus.all(id_shop);
    return response;
  },
  async create(menu) {
    const response = await repository_menus.create(menu);
    return response;
  },
  async update(menu) {
    const response = await repository_menus.update(menu);
    return response;
  },
  async delete(id) {
    const response = await repository_menus.delete(id);
    return response;
  },
};
