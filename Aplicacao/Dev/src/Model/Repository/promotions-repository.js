const Promotions = require('../database/models/Promotions');
require('../database/index');

module.exports = {
  async all(id) {
    const response = await Promotions.sequelize
      .query(
        'SELECT PR.id,PR.promotion_title,' +
          'PR.description,PR.start_date,PR.end_date,' +
          'SPP.latitude,SPP.longitude,' +
          'SP.shop_image,SP.name as shop_name,SPP.name as shopping_name' +
          'FROM promotions as PR ' +
          'INNER JOIN shops as SP ON PR.id_shop = SP.id ' +
          'INNER JOIN shoppings as SPP ON PR.id_shopping = SPP.id ' +
          `WHERE SPP.id = ${id}`,
        { type: Promocoes.sequelize.QueryTypes.SELECT }
      )
      .catch((e) => {
        return { message: e, result: false, status: 500 };
      });
    return { message: response, result: true, status: 200 };
  },
  async readById(id) {
    const response = await Promotions.findByPk(id, {
      raw: true,
      attributes: [
        'id',
        'id_shop',
        'id_shopping',
        'start_date',
        'end_date',
        'coupon',
        'description',
        'promotion_title',
      ],
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Identifier not found', result: false, status: 400 };
    }
    return { message: response, result: true, status: 200 };
  },
  async create(promotion) {
    const {
      id_shop,
      id_shopping,
      start_date,
      end_date,
      coupon,
      description,
      promotion_title,
    } = promotion;
    const response = await Promotions.create({
      id_shop,
      id_shopping,
      start_date,
      end_date,
      coupon,
      description,
      promotion_title,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Promotion created', result: true, status: 200 };
  },
  async update(promotion) {
    const {
      id,
      id_shop,
      id_shopping,
      start_date,
      end_date,
      coupon,
      description,
      promotion_title,
    } = promotion;
    let response = await Promotions.findByPk(id, {
      raw: true,
      attributes: ['id'],
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Identifier not found', result: false, status: 400 };
    }
    response = await Promotions.update(
      {
        id_shop,
        id_shopping,
        start_date,
        end_date,
        coupon,
        description,
        promotion_title,
      },
      { where: { id } }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Promotion updated', result: true, status: 200 };
  },
  async delete(id) {
    const response = await Promotions.destroy({ where: { id } }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Promotion deleted', result: true, status: 200 };
  },
};
