const { Model, DataTypes } = require('sequelize');

class Payment_methods extends Model {
  static init(sequelize) {
    super.init(
      {
        id_payment_method_type: DataTypes.INTEGER,
        id_card_flag: DataTypes.INTEGER,
        description: DataTypes.STRING(255),
      },
      {
        sequelize,
        tableName: 'payment_methods',
      }
    );
  }
}
module.exports = Payment_methods;
