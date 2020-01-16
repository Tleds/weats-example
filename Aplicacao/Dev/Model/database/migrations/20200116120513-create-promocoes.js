'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('promocoes',{
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
      id_local: {
          type: Sequelize.INTEGER,
          references: {
              model: 'locals',
              key: 'id'
          }
        },
      titulo_promocao: {
          type: Sequelize.STRING(100),
          allowNull:false
      },
      descricao: {
          type: Sequelize.STRING(255),
          allowNull:true
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull:false
      },
      data_fim: {
        type: Sequelize.DATE,
        allowNull:true
      },
      cupom: {
        type: Sequelize.STRING(100),
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
    return queryInterface.dropTable('promocoes');
  }
};
