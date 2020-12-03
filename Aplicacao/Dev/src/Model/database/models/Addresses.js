const { Model, DataTypes } = require('sequelize');

class Addresses extends Model {
  static init(sequelize) {
    super.init(
      {
        street: DataTypes.STRING(255),
        number: DataTypes.INTEGER(10),
        complement: DataTypes.STRING(255),
        neighborhood: DataTypes.STRING(100),
        city: DataTypes.STRING(100),
        zip_code: DataTypes.STRING(8),
        state: DataTypes.STRING(2),
        country: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: 'addresses',
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
  }
}

module.exports = Addresses;
