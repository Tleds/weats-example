const Menus = require('../database/models/Menus');
const products_repository = require('./products-repository');
require('../database/index');

module.exports = {
  async all(id_shop) {
    const response = await Menus.sequelize
      .query(
        `SELECT ` +
          `MN.id, MN.id_shop, PC.name secao, PR.name nome,` +
          `PR.price preço, PR.description descricao, PR.image imagem ` +
          `FROM menus MN ` +
          `INNER JOIN products PR ON MN.id = PR.id_menu ` +
          `INNER JOIN products_classification PC ON PR.id_classification = PC.id ` +
          `WHERE MN.id_shop = ${id_shop}`
      )
      .catch((e) => {
        return { message: e, result: false, status: 500 };
      });
    if (!response) {
      return { message: 'Invalid shop identifier', result: false, status: 400 };
    }
    return { message: response, result: true, status: 200 };
  },
  async create(menu) {
    const { id_shop, products } = menu;
    const response = await Menus.create({
      id_shop,
    }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    await products.map(async (product) => {
      product.id_menu = response.id;
      const product_response = await products_repository.create(product);
      if (product_response.status === 500) {
        return response;
      }
    });
    return { message: 'Menu created', result: true, status: 200 };
  },
  async update(menu) {
    const { id, id_shop, products } = menu;

    let response = await Menus.findOne({ where: { id }, raw: true }).catch(
      (e) => {
        return { message: e, result: false, status: 500 };
      }
    );
    if (!response) {
      return { message: 'Menu not found', result: false, status: 400 };
    }

    response = await Menus.update(
      {
        id_shop,
      },
      { where: { id } }
    ).catch((e) => {
      return { message: e, result: false, status: 500 };
    });

    await products.map(async (product) => {
      const product_response = await products_repository.update(product);
      if (product_response.status === 500) {
        return response;
      }
    });
    return { message: 'Menu updated', result: true, status: 200 };
  },
  async delete(id) {
    let response = await Menus.findByPk(id, { attributes: ['id'] });

    if (!response) {
      return { message: 'Invalid menu', status: 400 };
    }
    response = await products_repository.delete(id);
    if (response.status === 500) {
      return response;
    }
    await Menus.destroy({ where: { id } }).catch((e) => {
      return { message: e, result: false, status: 500 };
    });
    return { message: 'Menu deleted', result: true, status: 200 };
  },
};
