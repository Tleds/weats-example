const services_shops_rating = require('../Model/Services/shops_rating-services');

module.exports = {
  async all(req, res, next) {
    const response = await services_shops_rating.all();
    return res.status(response.status).json(response);
  },
  async create(req, res, next) {
    const shop_rating = req.body;
    const response = await services_shops_rating.create(shop_rating);
    return res.status(response.status).json(response);
  },
  async update(req, res, next) {
    const shop_rating = req.body;
    const response = await services_shops_rating.update(shop_rating);
    return res.status(response.status).json(response);
  },
  async delete(req, res, next) {
    const shop_rating = req.body;
    const response = await services_shops_rating.delete(shop_rating);
    return res.status(response.status).json(response);
  },
};
