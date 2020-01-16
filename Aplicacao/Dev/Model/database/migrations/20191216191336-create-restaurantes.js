'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('restaurantes',{
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
      cnpj: {
          type: Sequelize.STRING(14),
          allowNull: false
      },
      email: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      senha: {
          type: Sequelize.STRING(100),
          allowNull:false
      },
      telefone: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      celular: {
          type: Sequelize.STRING(100),
          allowNull: true
      },
      id_local: {
          type: Sequelize.INTEGER,
          references: {
              model: 'locals',
              key: 'id'
          },
          allowNull: false,
          onDelete: 'cascade'
      },
      id_access: {
          type: Sequelize.INTEGER,
          allowNull:false,
          defaultValue : 1
      },
      imagem_restaurante:{
          type:Sequelize.TEXT,
          allowNull:true
      },
      avaliacao:{
          type:Sequelize.STRING,
          allowNull :true
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
    return queryInterface.dropTable('restaurantes');
  }
};
