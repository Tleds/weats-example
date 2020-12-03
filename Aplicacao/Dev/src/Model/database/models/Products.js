const { Model, DataTypes } = require('sequelize');

class Products extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(100),
        price: DataTypes.DOUBLE,
        description: DataTypes.STRING(255),
        image: DataTypes.STRING(255),
      },
      {
        sequelize,
        tableName: 'products',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Menus, { foreignKey: 'id_menu', as: 'menus' });
    this.hasMany(models.Products_classification, {
      foreignKey: 'id_classification',
      as: 'products_classification',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}
module.exports = Products;
