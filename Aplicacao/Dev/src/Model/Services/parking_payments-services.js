'use-strict';

const repository_parking_payments = require('../Repository/parking_payments-repository');

module.exports = {
  async all() {
    const response = await repository_parking_payments.all();
    return response;
  },
  async create(parking_payment) {
    const response = await repository_parking_payments.create(parking_payment);
    return responsparking_e;
  },
  async put(parking_payment) {
    const response = await repository_parking_payments.update(parking_payment);
    return response;
  },
  async delete(id) {
    const response = await repository_parking_payments.delete(id);
    return response;
  },
};
