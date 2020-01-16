'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mesas',{
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
      descricao: {
          type: Sequelize.STRING(100),
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
