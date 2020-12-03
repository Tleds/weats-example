module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shoppings', {
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
      latitude: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      id_image: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'shopping_files',
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
    return queryInterface.dropTable('shoppings');
  },
};
