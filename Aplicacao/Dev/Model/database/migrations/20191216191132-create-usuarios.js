'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios',{
      // attributos
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      nome: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      email: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      senha: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      telefone: {
          type: Sequelize.STRING(15),
          allowNull: false
      },
      cpf: {
          type: Sequelize.STRING(11),
          allowNull: false
      },
      id_access: {
          type: Sequelize.INTEGER,
          allowNull:false,
          defaultValue : 0
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull:false
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull:false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios');
  }
};
