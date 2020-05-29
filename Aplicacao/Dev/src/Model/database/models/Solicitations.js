const { Model, DataTypes } = require('sequelize');

class Solicitations extends Model {
  static init(sequelize) {
    super.init(
      {
        price: DataTypes.DECIMAL(10, 2),
        solicitation_password: DataTypes.STRING(10),
      },
      {
        sequelize,
        tableName: 'solicitations',
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
    this.belongsTo(models.Tables, {
      foreignKey: 'id_table',
      as: 'tables',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    this.belongsTo(models.Solicitation_status, {
      foreignKey: 'id_solicitation_status',
      as: 'solicitations_status',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}
module.exports = Solicitations;
