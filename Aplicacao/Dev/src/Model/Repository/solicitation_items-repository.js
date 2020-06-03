const SolicitationItems = require('../database/models/Solicitation_items');
require('../database/index');

class SolicitationItemsRepository {
  async create(solicitation_item) {
    const { id_product, amount, observation, price } = solicitation_item;
    await SolicitationItems.create({
      id_product,
      amount,
      observation,
      price,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Solicitation item created', status: 200 };
  }

  async update(solicitation_item) {
    const { id, id_product, amount, observation, price } = solicitation_item;
    await SolicitationItems.update(
      {
        id_product,
        amount,
        observation,
        price,
      },
      {
        where: { id },
      }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Solicitation item updated', status: 200 };
  }

  async delete(id_solicitation) {
    await SolicitationItems.destroy({
      where: { id_solicitation },
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Solicitation item deleted', status: 200 };
  }
}

module.exports = new SolicitationItemsRepository();
