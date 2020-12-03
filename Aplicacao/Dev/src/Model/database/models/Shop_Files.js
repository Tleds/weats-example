const { Model, DataTypes } = require('sequelize');

class ShopFiles extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(100),
        path: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: 'shop_files',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Shops, {
      foreignKey: 'id_image',
      as: 'shops',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

module.exports = ShopFiles;
