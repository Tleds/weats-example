'use-strict';

const services_pedidos = require('../Model/Services/solicitations-services');

class SolicitationsController {
  async readById(req, res, next) {
    const { id } = req.params;
    const response = await services_pedidos.readById(id);
    return res.status(response.status).json(response);
  }

  async create(req, res, next) {
    const solicitation = req.body;
    solicitation.id_user = req.userId;

    const response = await services_pedidos.create(solicitation);
    return res.status(response.status).json(response);
  }

  async update(req, res, next) {
    // request, responde e next

    const solicitation = req.body;

    if (!solicitation.id) {
      return res.status(400).json({ message: 'Invalid identifier' });
    }

    const response = await services_pedidos.update(solicitation);
    return res.status(response.status).json(response);
  }

  async delete(req, res, next) {
    // request, responde e next
    const { id } = req.params;
    const response = await services_pedidos.delete(id);
    return res.status(response.status).json(response);
  }
}

module.exports = new SolicitationsController();
