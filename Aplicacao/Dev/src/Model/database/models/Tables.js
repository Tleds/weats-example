const { Model, DataTypes } = require('sequelize');

class Tables extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: 'tables',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Shops, {
      foreignKey: 'id_shop',
      as: 'Shops',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

module.exports = Tables;
