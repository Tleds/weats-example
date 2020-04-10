const { Model, DataTypes } = require('sequelize');

class Shop_payments extends Model {
  static init(sequelize) {
    super.init(
      {
        final_price: DataTypes.DECIMAL(10, 2),
      },
      {
        sequelize,
        tableName: 'shop_payments',
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
      as: 'payment_method',
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
    this.belongsTo(models.Solicitations, {
      foreignKey: 'id_solicitation',
      as: 'solicitations',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

module.exports = Shop_payments;
