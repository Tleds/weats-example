const { Model, DataTypes } = require('sequelize');

class ShoppingFiles extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(100),
        path: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: 'shopping_files',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Shoppings, {
      foreignKey: 'id_image',
      as: 'shoppings',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

module.exports = ShoppingFiles;
