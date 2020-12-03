'use-strict';

const services_shoppings = require('../Repository/shoppings-repository');
const utils = require('./functions/services-functions');

module.exports = {
  async all(localization) {
    const final_json = [];
    const response = await services_shoppings.all();
    if (!localization) {
      return response;
    }
    if (!response.result) {
      return response;
    }
    // Calculando a distância
    await response.message.forEach((array) => {
      const coordenadas_shopping = {
        latitude: Number(array.latitude),
        longitude: Number(array.longitude),
      };
      const distance = utils.getDistance(localization, coordenadas_shopping);
      final_json.push({
        id: array.id,
        name: array.name,
        distance: Math.round(distance),
        shopping_image: array.shopping_image,
      });
    });
    // Ordenando o array
    final_json.sort(function (a, b) {
      return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;
    });
    response.message = final_json;
    return response;
  },
  async create(shopping) {
    const response = await services_shoppings.create(shopping);
    return response;
  },
  async update(shopping) {
    const response = await services_shoppings.update(shopping);
    return response;
  },
  async delete(id) {
    const response = await services_shoppings.delete(id);
    return response;
  },
};
