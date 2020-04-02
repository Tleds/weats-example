const sequelize = require('../../src/Model/database/index');

module.exports = {
  async cleanDatabase() {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    return Promise.all(
      Object.keys(sequelize.models).map((key) => {
        return sequelize.models[key].destroy({
          truncate: {
            cascade: true,
            restartIdentity: true,
          },
        });
      })
    );
  },
};
