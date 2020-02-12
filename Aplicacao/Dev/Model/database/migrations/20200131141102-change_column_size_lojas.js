'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('lojas',
      'senha',
      {
        type: Sequelize.STRING(100),
      }
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('lojas',
      'senha',
      {
        type: Sequelize.STRING(16),
      }
      )
  }
};
