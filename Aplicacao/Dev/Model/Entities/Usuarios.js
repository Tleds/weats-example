const db = require('../Repository/connection_string');
const Model = db.Model;

const Usuario = db.sequelize.define('usuarios', {
    // attributos
    nome: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    senha: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    telefone: {
        type: db.Sequelize.STRING(15),
        allowNull: false
    },
    cpf: {
        type: db.Sequelize.STRING(11),
        allowNull: false
    }
});

/*db.sequelize.query("SET FOREIGN_KEY_CHECKS=0").then(() => {
    Usuario.sync({ force: true });
})*/
module.exports = Usuario;