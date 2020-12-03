'use-strict';

const services_shoppings = require('../Model/Services/shoppings-services');

module.exports = {
  // Vem da API de restaurantes
  async all(req, res, next) {
    const response = await services_shoppings.all(req.headers);
    return res.status(response.status).json(response);
  },
  async create(req, res, next) {
    const shopping = req.body;
    const response = await services_shoppings.create(shopping);
    return res.status(response.status).json(response);
  },
  async update(req, res, next) {
    // request, responde e next
    const shopping = req.body;
    const response = await services_shoppings.update(shopping);
    return res.status(response.status).json(response);
  },
  async delete(req, res, next) {
    // request, responde e next
    const { id } = req.headers;
    const response = await services_shoppings.delete(id);
    return res.status(response.status).json(response);
  },
};
