const { Model, DataTypes } = require('sequelize');

class Solicitation_status extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: 'solicitation_status',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Solicitations, {
      foreignKey: 'id_solicitation_status',
      as: 'solicitations',
    });
  }
}
module.exports = Solicitation_status;
