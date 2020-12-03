module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('parking_payments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_payment_method: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'payment_methods',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      card_code: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      final_price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('parking_payments');
  },
};
