const { Model, DataTypes } = require('sequelize');

class Promotions extends Model {
  static init(sequelize) {
    super.init(
      {
        promotion_title: DataTypes.STRING(100),
        description: DataTypes.STRING(255),
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        coupon: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: 'promotions',
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
    this.belongsTo(models.Shoppings, {
      foreignKey: 'id_shopping',
      as: 'shoppings',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}
module.exports = Promotions;
