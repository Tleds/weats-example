'use-strict';

const services_payments = require('../Model/Services/shop_payments-services');

module.exports = {
  async readById(req, res, next) {
    const response = await services_payments.readById(req.params.id);
    return res.status(response.status).json(response);
  },
  async create(req, res, next) {
    const shop_payment = req.body;

    const response = await services_payments.create(shop_payment);
    return res.status(response.status).json(response);
    // Aqui entra a integração com a API de pagamento para efetuar um pagamento.
  },
  async update(req, res, next) {
    // request, responde e next
    const shop_payment = req.body;
    if (!shop_payment.id) {
      return res.status(400).json({ message: 'Invalid identifier' });
    }

    const response = await services_payments.put(shop_payment);
    return res.status(response.status).json(response);
    // Aqui entra a integração com a API de pagamento paga alterar um pagamento
  },
  async delete(req, res, next) {
    // request, responde e next
    const { id } = req.headers;
    const response = await services_payments.delete(id);
    return res.status(response.status).json(response);
    // Aqui entra a integração com a API de pagamento para cancelar um pagamento
  },
};
