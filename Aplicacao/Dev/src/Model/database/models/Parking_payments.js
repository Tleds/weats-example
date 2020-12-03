const { Model, DataTypes } = require('sequelize');

class Parking_payments extends Model {
  static init(sequelize) {
    super.init(
      {
        card_code: DataTypes.STRING(255),
        final_price: DataTypes.DECIMAL(10, 2),
      },
      {
        sequelize,
        tableName: 'parking_payments',
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
    this.belongsTo(models.Payment_methods, {
      foreignKey: 'id_payment_method',
      as: 'payment_methods',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    this.belongsTo(models.users, {
      foreignKey: 'id_user',
      as: 'parking_payments',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

module.exports = Parking_payments;
