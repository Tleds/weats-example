module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'products_classification',
      [
        {
          name: 'Refeição',
        },
        {
          name: 'Vestuário',
        },
        {
          name: 'Alimentação',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products_classification', null, {});
  },
};
