const services_users = require('../Model/Services/users-services');

class ShowUserShopRatingsController {
  async showShopRatings(req, res, next) {
    const id = req.userId;
    const response = await services_users.showShopRatings(id);
    return res.status(response.status).json(response);
  }
}

module.exports = new ShowUserShopRatingsController();
