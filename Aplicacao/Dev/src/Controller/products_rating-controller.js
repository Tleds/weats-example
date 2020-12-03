const services_product_rating = require('../Model/Services/product_ratings-services');

class ProductsController {
  async all(req, res, next) {
    const response = await services_product_rating.all(req.userId);
    return res.status(response.status).json(response);
  }

  async create(req, res, next) {
    const product_rating = req.body;

    const response = await services_product_rating.create(product_rating);
    return res.status(response.status).json(response);
  }

  async update(req, res, next) {
    const product_rating = req.body;
    const response = await services_product_rating.update(product_rating);
    return res.status(response.status).json(response);
  }

  async delete(req, res, next) {
    const { id } = req.headers;

    const response = await services_product_rating.delete(id);
    return res.status(response.status).json(response);
  }
}

module.exports = new ProductsController();
