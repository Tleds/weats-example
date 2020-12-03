'use-strict';

const services_parking_payments = require('../Model/Services/parking_payments-services');

class ParkingPaymentsController {
  async all(req, res, next) {
    const response = await services_parking_payments.all(req.userId);
    return res.status(response.status).json(response);
  }

  async create(req, res, next) {
    const parking_payment = req.body;

    const response = await services_parking_payments.create(parking_payment);
    return res.status(response.status).json(response);
    // Aqui entra a integração com a API de pagamento para efetuar um pagamento.
  }

  async update(req, res, next) {
    // request, responde e next
    if (!req.body.id) {
      return res.status(400).json({ message: 'Invalid identifier' });
    }
    const payment = req.body;

    const response = await services_parking_payments.put(payment);
    return res.status(response.status).json(response);
    // Aqui entra a integração com a API de pagamento paga alterar um pagamento
  }

  async delete(req, res, next) {
    // request, responde e next
    if (!req.headers.id) {
      return res.status(400).json({ message: 'Invalid identifier' });
    }

    const response = await services_parking_payments.delete(req.headers.id);
    return res.status(response.status).json(response);
    // Aqui entra a integração com a API de pagamento para cancelar um pagamento
  }
}

module.exports = new ParkingPaymentsController();
