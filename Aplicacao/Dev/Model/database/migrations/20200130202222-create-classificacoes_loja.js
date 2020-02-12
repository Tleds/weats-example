'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classificacoes_loja',{
      id:{
           type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false
         },
      nome :{
        type:Sequelize.STRING(100),
        allowNull:false
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
    return queryInterface.dropTable('classificacoes_loja');
  }
};
