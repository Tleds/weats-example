'use-strict';

const services_shop = require('../Model/Services/shops-services'); // O repository só vai ser usado para métodos simples que não possuem regras de negócio.

module.exports = {
  async all(req, res, next) {
    const response = await services_shop.all(req.params.id_shopping);
    return res.status(response.status).json(response);
  },

  async readById(req, res, next) {
    const response = await services_shop.readById(req.userId);
    return res.status(response.status).json(response);
  },
  async create(req, res, next) {
    const shop = req.body;
    const response = await services_shop.create(shop);
    return res.status(response.status).json(response);
  },
  async update(req, res, next) {
    const shop = req.body;

    const response = await services_shop.update(shop);
    return res.status(response.status).json(response);
  },
  async delete(req, res, next) {
    const response = await services_shop.delete(req.userId);
    return res.status(response.status).json(response);
  },
};
