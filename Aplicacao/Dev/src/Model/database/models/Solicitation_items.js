const { Model, DataTypes } = require('sequelize');

class Solicitation_items extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: DataTypes.INTEGER,
        observation: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: 'solicitation_items',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Products, { foreignKey: 'id_product', as: 'products' });
    this.hasMany(models.Solicitations, {
      foreignKey: 'id_solicitation',
      as: 'solicitations',
    });
  }
}
module.exports = Solicitation_items;
