'use-strict';

const services_mesas = require('../Model/Services/tables-services');

class TablesController {
  async readById(req, res, next) {
    const response = await services_mesas.readById(req.params.id);
    return res.status(response.status).json(response);
  }

  async create(req, res, next) {
    const table = req.body;
    const { id_shop, id_shopping } = table;

    // Cadastra a mesa no banco de dados
    let response = await services_mesas.create(table);
    const data = { shop: id_shop, shopping: id_shopping };
    // Gera o QrCode da mesa
    response = await services_mesas.generatePDF(data);
    return res.status(response.status).json(response);
  }

  async update(req, res, next) {
    // request, responde e next
    const table = req.body;

    const response = await services_mesas.update(table);
    return res.status(response.status).json(response);
  }

  async delete(req, res, next) {
    // request, responde e next
    if (!req.userId) {
      return res.status(400).json({ message: 'Invalid identifier' });
    }

    const response = await services_mesas.delete(req.params.id);
    return res.status(response.status).json(response);
  }
}

module.exports = new TablesController();
