'use-strict';

const repository_solicitations = require('../Repository/solicitations-repository');

module.exports = {
  async readById(id) {
    const response = await repository_solicitations.readById(id);
    return response;
  },
  async create(solicitation) {
    const response = await repository_solicitations.create(solicitation);
    return response;
  },
  async update(solicitation) {
    const response = await repository_solicitations.update(solicitation);
    return response;
  },
  async delete(id) {
    const response = await repository_solicitations.delete(id);
    return response;
  },
};
