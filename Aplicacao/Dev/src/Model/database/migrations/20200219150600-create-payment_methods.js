module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payment_methods', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_payment_method_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'payment_method_types',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      id_card_flag: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'card_flags',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
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
    return queryInterface.dropTable('payment_methods');
  },
};
