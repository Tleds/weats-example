const services_users = require('../Model/Services/users-services');

class ShowUserShopPaymentsController {
  async showShopPayments(req, res, next) {
    const id = req.userId;
    const response = await services_users.showShopPayments(id);
    return res.status(response.status).json(response);
  }
}

module.exports = new ShowUserShopPaymentsController();
