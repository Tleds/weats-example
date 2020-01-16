'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pagamentos',{
      id:{
           type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false
         },
      id_forma_pagamento: {
          type: Sequelize.INTEGER,
          references: {
              model: 'formas_pagamento',
              key: 'id'
          },
          allowNull: false
      },
      id_usuario: {
          type: Sequelize.INTEGER,
          references: {
              model: 'usuarios',
              key: 'id'
          },
          allowNull: false,
          onDelete: 'cascade'
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
      id_mesa: {
          type: Sequelize.INTEGER,
          references: {
              model: 'mesas',
              key: 'id'
          },
          allowNull: false,
          onDelete: 'cascade'
      },
      id_pedido: {
          type: Sequelize.INTEGER,
          references: {
              model: 'pedidos',
              key: 'id'
          },
          allowNull: false,
          onDelete: 'cascade'
      },
      preco_final: {
          type: Sequelize.DECIMAL(10, 2),
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
    return queryInterface.dropTable('pagamentos');
  }
};
