const Shops = require('../database/models/Shops');
const Addresses = require('../database/models/Addresses');
const Tables = require('../database/models/Tables');
const Solicitations = require('../database/models/Solicitations');
const Payment_methods = require('../database/models/Payment_methods');
require('../database/index');

module.exports = {
  async all(id_shopping) {
    const response = await Shops.findAll({
      where: { id_shopping },
      raw: true,
      attributes: [
        'id',
        'id_shopping',
        'id_shop_type',
        'cnpj',
        'name',
        'email',
        'telephone',
        'cellphone',
        'password',
        'id_image',
      ],
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: response, result: true, status: 200 };
  },
  async catalog() {
    const response = await Shops.findAll({
      raw: true,
      attributes: [
        'id',
        'id_shopping',
        'id_shop_type',
        'cnpj',
        'name',
        'email',
        'telephone',
        'cellphone',
        'password',
        'shop_image',
      ],
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: response, result: false, status: 200 };
  },
  async showTables(id_shop) {
    const response = await Tables.findAll({
      raw: true,
      where: { id_shop },
      attributes: ['id', 'id_shop', 'description'],
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: response, result: true, status: 200 };
  },
  async showSolicitations(id_shop) {
    const response = await Solicitations.findAll({
      raw: true,
      where: { id_shop },
      attributes: [
        'id',
        'id_shop',
        'id_user',
        'id_product_menu',
        'amount',
        'observation',
        'id_solicitation_status',
        'price',
        'solicitation_password',
      ],
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: response, result: true, status: 200 };
  },
  async showAcceptPaymentMethods(id_shop) {
    const response = await Payment_methods.findAll({
      where: { id_shop },
      raw: true,
      attributes: [
        'id',
        'description',
        'id_payment_method_type',
        'id_card_flag',
      ],
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: response, result: true, status: 200 };
  },
  async readById(id) {
    const response = await Shops.findByPk(id, { raw: true }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });

    if (!response) {
      return { message: 'Shop not found', result: false, status: 400 };
    }

    return { message: response, result: true, status: 200 };
  },
  async create(shop) {
    const {
      id_shopping,
      id_shop_type,
      cnpj,
      name,
      email,
      telephone,
      cellphone,
      password,
      address,
    } = shop;
    const {
      street,
      number,
      complement,
      neighborhood,
      city,
      zip_code,
      state,
      country,
    } = address;

    const response = await Shops.create({
      id_shopping,
      id_shop_type,
      cnpj,
      name,
      email,
      telephone,
      cellphone,
      password,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });

    await Addresses.create({
      id_shop: response.id,
      street,
      number,
      complement,
      neighborhood,
      city,
      zip_code,
      state,
      country,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });

    return { message: 'Shop and address created', result: true, status: 200 };
  },
  async validaEmail(email) {
    const response = await Shops.findOne({
      raw: true,
      where: { email },
      attributes: ['email'],
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (response) {
      return {
        message: 'E-mail already registered',
        result: false,
        status: 400,
      };
    }

    return { message: 'Valid email', result: true, status: 200 };
  },
  async validaCNPJ(cnpj) {
    const response = await Shops.findOne({
      raw: true,
      where: { cnpj },
      attributes: ['cnpj'],
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (response) {
      return { message: 'CNPJ already registered', result: false, status: 400 };
    }
    return { message: 'Valid CNPJ', result: true, status: 200 };
  },
  async update(shop) {
    const {
      id,
      id_shopping,
      cnpj,
      name,
      telephone,
      cellphone,
      id_image,
      address,
    } = shop;
    const {
      street,
      number,
      complement,
      neighborhood,
      city,
      zip_code,
      state,
      country,
    } = address;

    let response = await Shops.findByPk(id).catch((e) => {
      return { message: e, result: false };
    });

    if (!response) {
      return { message: 'Identificador inválido', result: false };
    }

    response = await Shops.update(
      {
        id_shopping,
        cnpj,
        name,
        telephone,
        cellphone,
        id_image,
      },
      { where: { id } }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    response = await Addresses.update(
      {
        street,
        number,
        complement,
        neighborhood,
        city,
        zip_code,
        state,
        country,
      },
      { where: { id_shop: id } }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Shop and address updated', result: true, status: 200 };
  },
  async delete(id) {
    let response = await Shops.findByPk(id).catch((e) => {
      return { message: e, result: false, status: 500 };
    });

    if (!response) {
      return { message: 'Invalid identifier', result: false, status: 400 };
    }

    response = await Shops.destroy({ where: { id } }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Shop deleted', result: true, status: 200 };
  },
  async validaZipCode(zip_code) {
    const response = await Addresses.findOne({
      raw: true,
      where: { zip_code },
      attributes: ['zip_code'],
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (response) {
      return {
        message: 'Zip code already registered',
        result: false,
        status: 400,
      };
    }

    return { message: 'Valid zip code', result: true, status: 200 };
  },
};
