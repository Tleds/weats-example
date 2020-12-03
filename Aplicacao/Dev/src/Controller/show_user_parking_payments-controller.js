const services_users = require('../Model/Services/users-services');

class ShowUserParkingPaymentsController {
  async showParkingPayments(req, res, next) {
    const id = req.userId;
    const response = await services_users.showParkingPayments(id);
    return res.status(response.status).json(response);
  }
}

module.exports = new ShowUserParkingPaymentsController();
