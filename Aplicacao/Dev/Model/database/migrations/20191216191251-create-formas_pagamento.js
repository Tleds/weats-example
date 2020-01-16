'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('formas_pagamento',{
      id:{
           type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false
         },
      descricao: {
          type: Sequelize.STRING(255),
          allowNull: false
      },
      tipo_forma_pagamento: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      bandeira: {
          type: Sequelize.STRING(255),
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
    return queryInterface.dropTable('formas_pagamento');
  }
};
