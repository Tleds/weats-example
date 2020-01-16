'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'avaliacao_restaurantes',
        'avaliacao',
        {
          type: Sequelize.DOUBLE,
          allowNull: false
        }
      )
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('avaliacao_restaurantes', 'avaliacao')
  }
};
