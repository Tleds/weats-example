const { Model, DataTypes } = require('sequelize');

class Products_classification extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: 'products_classification',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Menus, {
      foreignKey: 'id_classification',
      as: 'menus',
    });
  }
}
module.exports = Products_classification;
