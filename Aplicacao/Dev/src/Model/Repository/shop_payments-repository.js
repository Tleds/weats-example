const Shop_payments = require('../database/models/Shop_payments');
require('../database/index');

module.exports = {
  async showUserShopPayments(id_user) {
    const response = await Shop_payments.findAll({
      raw: true,
      attributes: [
        'id',
        'id_payment_method',
        'id_user',
        'id_shop',
        'id_table',
        'id_solicitation',
        'final_price',
      ],
      where: { id_user },
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Payment not found', result: false, status: 400 };
    }
    return { message: response, result: true, status: 200 };
  },
  async create(shop_payment) {
    const {
      id_payment_method,
      id_user,
      id_shop,
      id_table,
      id_solicitation,
      final_price,
    } = shop_payment;
    await Shop_payments.create({
      id_payment_method,
      id_user,
      id_shop,
      id_table,
      id_solicitation,
      final_price,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Payment created', result: true, status: 200 };
  },
  async readById(id) {
    const response = await Shop_payments.findByPk(id).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Payment not found', result: false, status: 400 };
    }
    return { message: response, result: true, status: 200 };
  },
  async update(shop_payment) {
    const {
      id,
      id_payment_method,
      id_user,
      id_shop,
      id_table,
      id_solicitation,
      final_price,
    } = shop_payment;
    let response = await Shop_payments.findOne({
      where: { id },
      raw: true,
      attributes: ['id'],
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });

    if (!response) {
      return { message: 'Invalid identifier', result: false, status: 400 };
    }

    response = await Shop_payments.update(
      {
        id_payment_method,
        id_user,
        id_shop,
        id_table,
        id_solicitation,
        final_price,
      },
      {
        where: { id },
      }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Payment updated', result: true, status: 200 };
  },
  async delete(id) {
    await Shop_payments.destroy({
      where: { id },
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Payment deleted', result: false, status: 200 };
  },
};
