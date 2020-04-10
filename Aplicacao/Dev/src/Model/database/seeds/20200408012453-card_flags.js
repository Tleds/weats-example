module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'card_flags',
      [
        {
          name: 'Master Card',
        },
        {
          name: 'Visa',
        },
        {
          name: 'American Express',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('card_flags', null, {});
  },
};
