const Solicitations = require('../database/models/Solicitations');
const SolicitationItems = require('../database/models/Solicitation_items');
require('../database/index');

module.exports = {
  async readById(id) {
    const response = await Solicitations.findAll({
      where: { id },
      raw: true,
      attributes: [
        'id',
        'id_shop',
        'id_user',
        'id_product_name',
        'amount',
        'observation',
        'id_solicitation_status',
        'price',
        'solicitation_password',
      ],
      order: [['createdAt', 'DESC']],
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Invalid solicitation', result: false, status: 400 };
    }

    return { message: response, result: true, status: 200 };
  },
  async create(solicitation) {
    const {
      id_shop,
      id_user,
      id_product_menu,
      amount,
      price,
      observation,
      solicitation_password,
      solicitation_items,
    } = solicitation;

    await Solicitations.create({
      id_shop,
      id_user,
      id_product_menu,
      amount,
      price,
      observation,
      solicitation_password,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });

    await solicitation_items.map(async (item) => {
      await SolicitationItems.create({
        id_product: item.id_product,
        amount: item.amount,
        observation: item.observation,
        price: item.price,
      }).catch((e) => {
        return { message: e, result: false, status: 500 };
      });
    });

    return { message: 'Solicitation created', result: true, status: 200 };
  },
  async update(solicitation) {
    const {
      id,
      id_shop,
      id_user,
      id_product_menu,
      amount,
      price,
      observation,
      solicitation_password,
      solicitation_items,
    } = solicitation;
    let response = await Solicitations.findOne({
      where: { id },
      raw: true,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    if (!response) {
      return { message: 'Invalid solicitation', result: false, status: 400 };
    }
    response = await Solicitations.update(
      {
        id_shop,
        id_user,
        id_product_menu,
        amount,
        price,
        observation,
        solicitation_password,
      },
      { where: { id } }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });

    await solicitation_items.map(async (item) => {
      await SolicitationItems.update(
        {
          id_product: item.id_product,
          amount: item.amount,
          observation: item.observation,
          price: item.price,
        },
        { where: { id: item.id } }
      ).catch((e) => {
        return { message: e, result: false, status: 500 };
      });
    });

    return { message: 'Solicitation updated', result: true, status: 200 };
  },
  async delete(id) {
    const solicitation = await Solicitations.findByPk(id, {
      attributes: ['id'],
      raw: true,
    });

    if (!solicitation) {
      return {
        message: 'Invalid solicitation',
        status: 401,
      };
    }
    if (solicitation.id_solicitation_status === 2) {
      return {
        message:
          'The solicitation cannot be canceled as it is already being prepared by the shop',
        status: 401,
      };
    }
    await Solicitations.destroy({
      where: { id },
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });

    await SolicitationItems.destroy({
      where: { id_solicitation: id },
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });

    return { message: 'Solicitation deleted', result: true, status: 200 };
  },
};
