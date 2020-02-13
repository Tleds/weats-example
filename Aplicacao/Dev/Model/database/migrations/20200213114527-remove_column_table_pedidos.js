'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // queryInterface.removeConstraint('pedidos', 'pedidos_ibfk_2');
    return queryInterface.removeColumn('pedidos', 'id_mesa');
    
  },

  down: (queryInterface, Sequelize) => {
    // queryInterface.addConstraint('pedidos', ['mesa'],{
    //   type: 'foreign key',
    //   name: 'id_mesa',
    //   references: { //Required field
    //     table: 'mesas',
    //     field: 'id'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });
    return queryInterface.addColumn('pedidos','id_mesa');
    
  }
};
