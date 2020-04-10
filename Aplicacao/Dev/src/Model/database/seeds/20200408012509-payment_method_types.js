module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'payment_method_types',
      [
        {
          name: 'Débito',
        },
        {
          name: 'Crédito',
        },
        {
          name: 'Alimentação',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('payment_method_types', null, {});
  },
};
