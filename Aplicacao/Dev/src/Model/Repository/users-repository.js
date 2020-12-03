const Users = require('../database/models/Users');
require('../database/index');

module.exports = {
  async all() {
    const response = await Users.findAll({
      attributes: ['id', 'name', 'email', 'cpf', 'telephone'],
      raw: true,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: response, result: true, status: 200 };
  },
  async create(user) {
    const { name, email, password, telephone, cpf } = user;
    await Users.create({
      name,
      email,
      password,
      telephone,
      cpf,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'User created', result: true, status: 200 };
  },
  async validaEmailUser(email) {
    const response = await Users.findOne({ where: { email }, raw: true }).catch(
      (e) => {
        return { message: e, result: false, status: 500 };
      }
    );
    if (!response) {
      return { message: 'E-mail not found', result: true, status: 200 };
    }

    return { message: 'Email found', result: false, status: 400 };
  },
  async update(user) {
    const { id, name, telephone } = user;

    let response = await Users.findOne({ where: { id }, raw: true }).catch(
      (e) => {
        return { message: e, result: false, status: 500 };
      }
    );

    if (!response) {
      return { message: 'User not found', result: false, status: 400 };
    }

    response = await Users.update({ name, telephone }, { where: { id } }).catch(
      (e) => {
        return { message: e, result: false, status: 500 };
      }
    );

    return { message: 'User updated', result: true, status: 200 };
  },
  async validaCpf(cpf) {
    const response = await Users.findOne({ where: { cpf }, raw: true }).catch(
      (e) => {
        return { message: e, result: false, status: 500 };
      }
    );

    if (!response) {
      return { message: 'CPF not found', result: true, status: 200 };
    }

    return { message: 'Cpf found', result: false, status: 400 };
  },
  async readById(id) {
    const response = await Users.findByPk(id, {
      attributes: ['id', 'name', 'email', 'telephone', 'cpf'],
      raw: true,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'User not found', result: false, status: 400 };
    }
    return { message: response, result: true, status: 200 };
  },
  async delete(id) {
    const response = await Users.destroy({ where: { id } }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'User not found', result: false, status: 400 };
    }

    return { message: 'User deleted', result: true, status: 200 };
  },
};
