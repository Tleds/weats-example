const Shops_rating = require('../database/models/Shop_ratings');
require('../database/index');

module.exports = {
  async all() {
    const response = await Shops_rating.findAll({ raw: true }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Invalid identifier', result: false, status: 400 };
    }
    return { message: response, result: true, status: 200 };
  },
  async readById(id) {
    const response = await Shops_rating.findAll({
      where: { id },
      raw: true,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Invalid identifier', result: false, status: 400 };
    }
    return { message: response, result: true, status: 200 };
  },
  async create(shop_rating) {
    const { id_shop, id_user, description, rating } = shop_rating;
    await Shops_rating.create({
      id_shop,
      id_user,
      description,
      rating,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Shop rating created', result: true, status: 200 };
  },
  async update(shop_rating) {
    const { id, id_shop, id_user, description, rating } = shop_rating;

    let response = await Shops_rating.findOne({ where: id }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Shop rating not found', result: false, status: 400 };
    }

    response = await Shops_rating.update(
      { id_shop, id_user, description, rating },
      { where: { id } }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'RShop rating updated', result: true, status: 200 };
  },
  async delete(id) {
    await Shops_rating.destroy({ where: { id } }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Shop rating updated', result: true, status: 200 };
  },
};
