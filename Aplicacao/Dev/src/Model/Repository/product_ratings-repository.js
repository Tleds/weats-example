const Products_rating = require('../database/models/Product_ratings');
require('../database/index');

module.exports = {
  async all() {
    const response = await Products_rating.findAll({ raw: true }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Product not found', result: false, status: 400 };
    }
    return { message: response, result: true, status: 200 };
  },
  async readById(id) {
    const response = await Products_rating.findAll({
      where: { id },
      raw: true,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Product not found', result: false, status: 400 };
    }
    return { message: response, result: true, status: 200 };
  },
  async create(product_rating) {
    const {
      id_product_menu,
      id_shop,
      id_user,
      description,
      rating,
    } = product_rating;
    const response = await Products_rating.create({
      id_product_menu,
      id_shop,
      id_user,
      description,
      rating,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Product rating created', result: true, status: 200 };
  },
  async update(product_rating) {
    const {
      id,
      id_product_menu,
      id_shop,
      id_user,
      description,
      rating,
    } = product_rating;

    let response = await Products_rating.findOne({ where: id }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Product not found', result: false, status: 400 };
    }

    response = await Products_rating.update(
      { id_product_menu, id_shop, id_user, description, rating },
      { where: { id } }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Product rating updated', result: true, status: 200 };
  },
  async delete(id) {
    await Products_rating.destroy({ where: { id } }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Product rating', result: true, status: 200 };
  },
};
