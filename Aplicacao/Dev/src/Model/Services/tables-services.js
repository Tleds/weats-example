'use-strict';

const qr_code = require('qrcode');
const repository_tables = require('../Repository/tables-repository');
const ct = require('../Repository/functions/criptografia');
const services_functions = require('./functions/services-functions');

module.exports = {
  async readById(id) {
    const response = await repository_tables.readById(id);
    return response;
  },
  async create(table) {
    const response = await repository_tables.create(table);
    return response;
  },
  async update(table) {
    const response = repository_tables.update(table);
    return response;
  },
  async delete(id) {
    const response = await repository_tables.delete(id);
    return response;
  },
  async generatePDF(data) {
    const { shop } = data;
    data = ct.cp(JSON.stringify(data));
    const result = await qr_code.toDataURL(data);
    const response = await services_functions.generatePDF(result, shop);
    return response;
  },
};
