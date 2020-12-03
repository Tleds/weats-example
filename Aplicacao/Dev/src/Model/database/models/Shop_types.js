const { Model, DataTypes } = require('sequelize');

class Shop_types extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: 'shop_types',
      }
    );
  }
}

module.exports = Shop_types;
