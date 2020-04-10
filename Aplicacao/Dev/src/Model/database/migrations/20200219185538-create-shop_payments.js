module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shop_payments', {
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
      id_shop: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'shops',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      id_table: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tables',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      id_solicitation: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'solicitations',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      final_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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
    return queryInterface.dropTable('shop_payments');
  },
};
