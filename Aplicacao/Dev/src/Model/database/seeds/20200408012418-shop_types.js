module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'shop_types',
      [
        {
          name: 'Loja de shopping',
        },
        {
          name: 'Loja de rua',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('shop_types', null, {});
  },
};
