const { Model, DataTypes } = require('sequelize');

class Shop_ratings extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING(255),
        rating: DataTypes.DOUBLE,
      },
      {
        sequelize,
        tableName: 'shop_ratings',
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
  }
}

module.exports = Shop_ratings;
