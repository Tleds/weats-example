module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'shoppings',
      [
        {
          name: 'BH Shopping',
          latitude: '-19.9746033',
          longitude: '-43.9436579',
          id_image: null,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('shoppings', null, {});
  },
};
