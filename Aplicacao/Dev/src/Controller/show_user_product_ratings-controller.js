const services_users = require('../Model/Services/users-services');

class ShowUserProductRatingsController {
  async showProductRatings(req, res, next) {
    const id = req.userId;
    const response = await services_users.showProductRatings(id);
    return res.status(response.status).json(response);
  }
}

module.exports = new ShowUserProductRatingsController();
