const Tables = require('../database/models/Tables');
require('../database/index');

module.exports = {
  async all(id_restaurante) {
    const response = await Tables.findAll(
      { where: { id_restaurante } },
      { raw: true, attributes: ['id', 'description'] }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Invalid shop', result: false, status: 400 };
    }
    return { message: response, result: true, status: 200 };
  },
  async create(table) {
    const { id_shop, description } = table;
    await Tables.create({ id_shop, description }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Table created', result: true, status: 200 };
  },
  // Verificar necessidade
  async readById(id) {
    const response = await Tables.findByPk(id, { raw: true }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: response, response: true, status: 200 };
  },
  // Verificar necessidade
  async update(table) {
    const { id, id_shop, description } = table;

    let response = await Tables.findOne({ where: { id }, raw: true });
    if (!response) {
      return { message: 'Invalid identifier', result: false, status: 400 };
    }

    response = await Tables.update(
      { id_shop, description },
      { where: { id } }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Table updated', result: true, status: 200 };
  },
  async delete(id) {
    const response = await Tables.findByPk(id).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Identifier dont exist', result: false, status: 400 };
    }
    await Tables.destroy({
      where: { id },
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Table deleted', result: true, status: 200 };
  },
};
