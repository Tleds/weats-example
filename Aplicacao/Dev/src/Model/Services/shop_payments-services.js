'use-strict';

const repository_shop_payments = require('../Repository/shop_payments-repository');

module.exports = {
  async readById(id) {
    const response = await repository_shop_payments.readById(id);
    return response;
  },
  async create(shop_payment) {
    const response = await repository_shop_payments.create(shop_payment);
    return response;
  },
  async put(shop_payment) {
    const response = await repository_shop_payments.update(shop_payment);
    return response;
  },
  async delete(id) {
    const response = await repository_shop_payments.delete(id);
    return response;
  },
};
