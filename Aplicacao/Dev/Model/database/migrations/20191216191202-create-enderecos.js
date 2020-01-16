'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('enderecos',{
      id:{
           type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false
         },
      id_restaurante: {
      type: Sequelize.INTEGER,
      references: {
          model: 'restaurantes',
          key: 'id'
      },
      allowNull: false,
      onDelete: 'cascade'
      },
      rua: {
          type: Sequelize.STRING(255),
          allowNull: false
      },
      numero: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      bairro: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      cidade: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      cep: {
          type: Sequelize.STRING(8),
          allowNull: false
      },
      uf: {
          type: Sequelize.STRING(2),
          allowNull: false
      },
      pais: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      localizacao: {
          type: Sequelize.STRING(255),
          allowNull: true
      },
      createdAt:{
           type: Sequelize.DATE,
           allowNull:false
         },
         updatedAt:{
           type: Sequelize.DATE,
           allowNull:false
         }
     });
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.dropTable('enderecos');
  }
};
