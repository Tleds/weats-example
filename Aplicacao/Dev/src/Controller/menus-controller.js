'use-strict';

const services_menus = require('../Model/Services/menus-services'); // O repository só vai ser usado para métodos simples que não possuem regras de negócio.

class MenusController {
  async all(req, res, next) {
    if (!req.params.id_shop) {
      return res
        .status(400)
        .json({ message: 'Shop cannot be null', result: false });
    }

    const response = await services_menus.all(req.params.id_shop);
    return res.status(response.status).json(response);
  }

  async create(req, res, next) {
    const menu = req.body;

    const response = await services_menus.create(menu);
    return res.status(response.status).json(response);
  }

  async update(req, res, next) {
    const menu = req.body;

    if (!menu.id) {
      return res.status(400).json({ message: 'Invalid identifier' });
    }

    const response = await services_menus.update(menu);
    return res.status(response.status).json(response);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const response = await services_menus.delete(id);
    return res.status(response.status).json(response);
  }
}

module.exports = new MenusController();
