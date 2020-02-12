'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lojas',{
      id:{
           type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false
         },
      id_local: {
          type: Sequelize.INTEGER,
          references: {
              model: 'locals',
              key: 'id'
          }
        },
      cnpj: {
          type: Sequelize.STRING(100),
          allowNull:false
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      email: {
          type: Sequelize.STRING(100),
          allowNull:false
      },
      telefone: {
        type: Sequelize.STRING(10),
        allowNull:false
      },
      celular: {
        type: Sequelize.STRING(100),
        allowNull:true
      },
      senha: {
        type: Sequelize.STRING(16),
        allowNull:false
      },
      imagem_loja: {
        type: Sequelize.STRING(255),
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
    return queryInterface.dropTable('lojas');
  }
};
