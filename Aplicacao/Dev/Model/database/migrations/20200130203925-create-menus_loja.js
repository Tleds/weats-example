'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('menus_loja',{
      id:{
           type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false
         },
      id_loja: {
        type: Sequelize.INTEGER,
        references: {
            model: 'lojas',
            key: 'id'
        },
        allowNull:false
      },
      id_classificacao: {
        type: Sequelize.INTEGER,
        references: {
            model: 'classificacoes_loja',
            key: 'id'
        },
        allowNull:false
      },
      nome :{
        type:Sequelize.STRING(100),
        allowNull:false
      },
      marca :{
        type:Sequelize.STRING(100),
        allowNull:false
      },
      descricao :{
        type:Sequelize.STRING(255),
        allowNull:false
      },
      preco :{
        type:Sequelize.DOUBLE,
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
    return queryInterface.dropTable('menus_loja');
  }
};
