'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('avaliacao_restaurantes',{
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
          }
        },
      id_usuario: {
          type: Sequelize.INTEGER,
          references: {
              model: 'usuarios',
              key: 'id'
          }
        },
      descricao: {
          type: Sequelize.STRING(255),
          allowNull:true
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
    return queryInterface.dropTable('avaliacao_restaurantes');
  }
};
