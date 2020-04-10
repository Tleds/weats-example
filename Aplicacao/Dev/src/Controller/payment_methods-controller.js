'use-strict';

const services_payment_methods = require('../Model/Services/payment_methods-services');

class PaymentMethodsController {
  async all(req, res, next) {
    const response = await services_payment_methods.all(req.userId);
    return res.status(response.status).json(response);
  }

  async create(req, res, next) {
    const payment_method = req.body;
    const response = await services_payment_methods.create(payment_method);
    return res.status(response.status).json(response);
  }

  async update(req, res, next) {
    // request, responde e next
    const payment_method = req.body;
    if (!payment_method.id) {
      return res.status(400).json({ message: 'Invalid identifier' });
    }

    const response = await services_payment_methods.update(payment_method);
    return res.status(response.status).json(response);
  }

  async delete(req, res, next) {
    const response = await services_payment_methods.delete(req.params.id);
    return res.status(response.status).json(response);
  }
}

module.exports = new PaymentMethodsController();
