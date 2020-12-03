const Shoppings = require('../database/models/Shoppings');
const ShoppingFiles = require('../database/models/Shopping_Files');
require('../database/index');

module.exports = {
  async all() {
    const response = await Shoppings.findAll({
      attributes: ['id', 'name', 'latitude', 'longitude', 'id_image'],
      raw: true,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Shopping not found', result: false, status: 400 };
    }
    return { message: response, result: true, status: 200 };
  },
  async create(shopping) {
    const { name, latitude, longitude, id_image } = shopping;
    await Shoppings.create({
      name,
      id_image,
      latitude,
      longitude,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Shopping created', result: true, status: 200 };
  },
  async update(shopping) {
    const { id, name, latitude, longitude, shopping_image } = shopping;

    let response = await Shoppings.findOne({
      where: { id },
      raw: true,
      attributes: ['id'],
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Shopping not found', result: false, status: 400 };
    }
    response = await Shoppings.update(
      { name, latitude, longitude, shopping_image },
      { where: { id } }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });

    return { message: 'Shopping updated', result: true, status: 200 };
  },
  async delete(id) {
    const response = await Shoppings.destroy({
      where: { id },
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Shopping deleted', result: true, status: 200 };
  },
};
