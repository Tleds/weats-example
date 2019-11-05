const Sequelize = require('sequelize');
//Conecta com o banco de dados
sequelize = new Sequelize('app', 'dbTeste', 'dbTestePUC', {
    host: 'database-1.clvpgii1euqz.sa-east-1.rds.amazonaws.com',
    port: '3306',
    dialect: 'mysql'
});
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};
/*sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });*/