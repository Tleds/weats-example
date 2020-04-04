module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('shops', 'password', 'password_hash');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('shops', 'password_hash', 'password');
  },
};
