const { Model, DataTypes } = require('sequelize');

class Shoppings extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(100),
        latitude: DataTypes.STRING(50),
        longitude: DataTypes.STRING(50),
      },
      {
        sequelize,
        tableName: 'shoppings',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Promotions, {
      foreignKey: 'id_shopping',
      as: 'Promotions',
    });
    this.hasMany(models.Shops, { foreignKey: 'id_shopping', as: 'Shops' });
    this.belongsTo(models.ShoppingFiles, {
      foreignKey: 'id_imagem',
      as: 'shopping_files',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}
module.exports = Shoppings;
