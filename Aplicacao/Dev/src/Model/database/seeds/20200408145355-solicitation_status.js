module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'solicitation_status',
      [
        {
          name: 'Pedido enviado ao restaurante, aguardando aceitação...',
        },
        {
          name: 'O pedido foi aceito e está sendo preparado',
        },
        {
          name: 'O pedido foi enviado para a entrega',
        },
        {
          name: 'Pedido entregue',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('solicitation_status', null, {});
  },
};
