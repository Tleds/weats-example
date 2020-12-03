const { Model, DataTypes } = require('sequelize');

class Menus extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        tableName: 'menus',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Shops, { foreignKey: 'id_shop  ', as: 'shops' });
  }
}
module.exports = Menus;
