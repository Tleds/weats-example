'use-strict';

const services_users = require('../Model/Services/users-services');

class UsersController {
  // async all(req, res, next) {
  //   const response = await services_users.all();
  //   return res.status(response.status).json(response);
  // }

  async readById(req, res, next) {
    const response = await services_users.readById(req.userId);
    return res.status(response.status).json(response);
  }

  async create(req, res, next) {
    const user = req.body;
    // Cria o usuário
    const response = await services_users.create(user);
    return res.status(response.status).json(response);
  }

  async update(req, res, next) {
    // request, responde e next
    const user = req.body;

    user.id = req.userId;
    const response = await services_users.update(user);
    return res.status(response.status).json(response);
  }

  async delete(req, res, next) {
    // request, responde e next
    if (!req.userId) {
      return res.status(400).json({ message: 'Invalid identifier' });
    }
    const response = await services_users.delete(req.userId);
    return res.status(response.status).json(response);
  }
}
module.exports = new UsersController();
