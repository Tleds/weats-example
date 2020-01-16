'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pedidos',{
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
      id_mesa: {
          type: Sequelize.INTEGER,
          references: {
              model: 'mesas',
              key: 'id'
          },
          allowNull: false,
          onDelete: 'cascade'
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
      produto: {
          type: Sequelize.STRING(50),
          allowNull: false
      },
      quantidade: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      observacao: {
          type: Sequelize.TEXT,
          allowNull: true
      },
      id_status: {
          type: Sequelize.INTEGER,
          defaultValue : 1,
          references: {
              model: 'status_pedido',
              key: 'id'
          },
          allowNull: false,
          onDelete: 'cascade'
      },
      preco_pedido: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
      },
      senha: {
          type: Sequelize.STRING(10),
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
    return queryInterface.dropTable('pedidos');
  }
};
