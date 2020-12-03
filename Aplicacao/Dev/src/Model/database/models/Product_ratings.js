const { Model, DataTypes } = require('sequelize');

class Product_ratings extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING(255),
        rating: DataTypes.DOUBLE,
      },
      {
        sequelize,
        tableName: 'product_ratings',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Shops, {
      foreignKey: 'id_shop',
      as: 'shops',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    this.belongsTo(models.Users, {
      foreignKey: 'id_user',
      as: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    this.belongsTo(models.Products, {
      foreignKey: 'id_product',
      as: 'products',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

module.exports = Product_ratings;
