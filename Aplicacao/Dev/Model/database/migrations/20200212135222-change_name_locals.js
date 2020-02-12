'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('locals', 'shoppings')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('shoppings', 'locals')
  }
};
