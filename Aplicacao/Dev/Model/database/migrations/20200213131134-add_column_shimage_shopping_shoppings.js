'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('shoppings', 'imagem_shopping',Sequelize.STRING,{
      after:'nome'
    });
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('shooppings','imagem_shopping');
    
  }
};
