module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shop_ratings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      description: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      rating: {
        type: Sequelize.DOUBLE,
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
    return queryInterface.dropTable('shop_ratings');
  },
};
