const Product = require('../database/models/Products');

class ProductsRepository {
  async create(product) {
    const {
      name,
      price,
      description,
      id_image,
      id_classification,
      id_menu,
    } = product;

    await Product.create({
      name,
      price,
      description,
      id_image,
      id_classification,
      id_menu,
    }).catch((e) => {
      return { message: 'Internal server error ', status: 500 };
    });

    return { message: 'Product created', status: 200 };
  }

  async update(product) {
    const {
      id,
      name,
      price,
      description,
      id_image,
      id_classification,
      id_menu,
    } = product;

    await Product.update(
      {
        name,
        price,
        description,
        id_image,
        id_classification,
        id_menu,
      },
      { where: { id } }
    ).catch((e) => {
      return { message: 'Internal server error ', status: 500 };
    });

    return { message: 'Product updated', status: 200 };
  }

  async delete(id_menu) {
    await Product.destroy({ where: { id_menu } }).catch((e) => {
      return { message: 'Internal server error', status: 500 };
    });
    return { message: 'Products deleted', status: 200 };
  }
}

module.exports = new ProductsRepository();
