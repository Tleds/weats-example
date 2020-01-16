'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('menus',{
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
          onDelete: 'cascade'
      },
      produto: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      secao: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      preco: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
      },
      descricao_produto: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      tipo_produto: {
          type: Sequelize.STRING(50),
          allowNull: false
      },
      imagem_produto: {
          type: Sequelize.TEXT,
          allowNull: false
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
    return queryInterface.dropTable('mesas');
  }
};
