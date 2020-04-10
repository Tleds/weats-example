'use-strict';

const repository_payment_methods = require('../Repository/payment_methods-repository');

module.exports = {
  async all() {
    const response = await repository_payment_methods.all();
    return response;
  },
  async create(payment_methods) {
    const response = await repository_payment_methods.create(payment_methods);
    return response;
  },
  async update(payment_methods) {
    const response = await repository_payment_methods.update(payment_methods);
    return response;
  },
  async delete(id) {
    const response = await repository_payment_methods.delete(id);
    return response;
  },
};
