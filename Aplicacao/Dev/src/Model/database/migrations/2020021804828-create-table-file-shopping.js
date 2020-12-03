module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('shopping_files', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        path: {
          type: Sequelize.STRING(100),
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
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shopping_files');
  },
};
