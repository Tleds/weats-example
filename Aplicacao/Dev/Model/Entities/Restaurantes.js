const db = require('../Repository/connection_string');
const Model = db.Model;

const Restaurante = db.sequelize.define('restaurantes', {
    // attributos
    nome: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    cnpj: {
        type: db.Sequelize.STRING(14),
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    telefone: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    celular: {
        type: db.Sequelize.STRING(100),
        allowNull: true
    }
});
/*db.sequelize.query("SET FOREIGN_KEY_CHECKS=0").then(() => {
    Restaurante.sync({ force: true });
});*/

module.exports = Restaurante;