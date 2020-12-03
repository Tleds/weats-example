'use-strict';

const services_promotions = require('../Model/Services/promotions-services');

class PromotionsController {
  async all(req, res, next) {
    const response = await services_promotions.all();
    return res.status(response.status).json(response);
  }

  async create(req, res, next) {
    const promotion = req.body;

    const response = await services_promotions.create(promotion);
    return res.status(response.status).json(response);
  }

  async update(req, res, next) {
    // request, responde e next
    const promotion = req.body;

    const response = await services_promotions.update(promotion);
    return res.status(response.status).json(response);
  }

  async delete(req, res, next) {
    // request, responde e next
    const { id } = req.headers;

    const response = await services_promotions.delete(id);
    return res.status(response.status).json(response);
  }
}

module.exports = new PromotionsController();
