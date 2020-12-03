const repository_product_rating = require('../Repository/product_ratings-repository');

module.exports = {
  async all() {
    const response = await repository_product_rating.all();
    return response;
  },
  async readById(id) {
    const response = await repository_product_rating.readById(id);
    return response;
  },
  async create(product_rating) {
    const response = await repository_product_rating.create(product_rating);
    return response;
  },
  async update(product_rating) {
    const response = await repository_product_rating.update(product_rating);
    return response;
  },
  async delete(id) {
    const response = await repository_product_rating.delete(id);
    return response;
  },
};
