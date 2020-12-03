const Addresses = require('../database/models/Addresses');
require('../database/index');

module.exports = {
  async all() {
    const response = await Addresses.findAll({ raw: true }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: response, result: true, status: 200 };
  },
  async readById(id_shop) {
    const response = await Addresses.findAll({
      where: { id_shop },
      raw: true,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Invalid shop identifier', result: false, status: 400 };
    }
    return { message: response, result: true, status: 200 };
  },
  async create(req) {
    const {
      id_shop,
      addresses,
      number,
      neighborhood,
      city,
      zip_code,
      state,
      country,
    } = req.body.endereco;

    const response = await Addresses.create({
      id_shop,
      addresses,
      number,
      neighborhood,
      city,
      zip_code,
      state,
      country,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Address created', result: true, status: 200 };
  },
  async update(address) {
    const {
      id,
      id_shop,
      addresses,
      number,
      neighborhood,
      city,
      zip_code,
      state,
      country,
    } = address;
    let response = await Addresses.findOne({ where: { id }, raw: true }).catch(
      (e) => {
        return { message: e, result: true, status: 500 };
      }
    );
    if (!response) {
      return { message: 'Address not found', result: false, status: 400 };
    }
    response = await Addresses.update(
      {
        id_restaurante,
        endereco,
        numero,
        bairro,
        cidade,
        cep,
        uf,
        pais,
        localizacao,
      },
      { where: { id } }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Address updated', result: true, status: 200 };
  },
  async delete(id) {
    const response = await Addresses.destroy({ where: { id } }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Address deleted', result: true, status: 200 };
  },
};
