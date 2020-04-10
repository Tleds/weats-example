const Payment_methods = require('../database/models/Payment_methods');
require('../database/index');

module.exports = {
  async all() {
    const response = await Payment_methods.findAll({ raw: true }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return {
        message: 'Payment method not found',
        result: false,
        status: 400,
      };
    }
    return { message: response, result: true, status: 200 };
  },
  async readById(id) {
    const response = await Payment_methods.findOne({
      where: { id },
      raw: true,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return {
        message: 'Payment method not found',
        result: false,
        status: 500,
      };
    }
    return { message: response, result: true, status: 200 };
  },
  async create(payment_method) {
    const {
      description,
      id_payment_method_type,
      id_card_flag,
    } = payment_method;
    const response = await Payment_methods.create({
      description,
      id_payment_method_type,
      id_card_flag,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Payment method created', result: true, status: 200 };
  },
  async update(payment_method) {
    const {
      id,
      description,
      id_payment_method_type,
      id_card_flag,
    } = payment_method;
    let response = await Payment_methods.findOne({
      where: { id },
      raw: true,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Payment method not found', result: true, status: 400 };
    }

    response = await Payment_methods.update(
      { description, id_payment_method_type, id_card_flag },
      { where: { id } }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Payment method updated', result: true, status: 200 };
  },
  async delete(id) {
    let response = await Payment_methods.findByPk(id, { raw: true }).catch(
      (e) => {
        return { message: e, result: false, status: 500 };
      }
    );

    if (!response) {
      return { message: 'Invalid payment methods', result: false, status: 400 };
    }
    response = await Payment_methods.destroy({ where: { id } }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Payment method deleted', result: true, status: 200 };
  },
};
