module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shops', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_shopping: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'shoppings',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      id_shop_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'shop_types',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      cnpj: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      telephone: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      cellphone: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      id_image: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'shop_files',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      id_access: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
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
    return queryInterface.dropTable('shops');
  },
};
