const db = require('../Repository/connection_string');
const Model = db.Model;

const Enderecos = db.sequelize.define('enderecos', {
    // attributos
    id_restaurante: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'restaurantes',
            key: 'id'
        },
        allowNull: false
    },
    rua: {
        type: db.Sequelize.STRING(255),
        allowNull: false
    },
    numero: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    bairro: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    cidade: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    cep: {
        type: db.Sequelize.STRING(8),
        allowNull: false
    },
    uf: {
        type: db.Sequelize.STRING(2),
        allowNull: false
    },
    pais: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    localizacao: {
        type: db.Sequelize.STRING(255),
        allowNull: true
    }

});
/*db.sequelize.query("SET FOREIGN_KEY_CHECKS=0").then(() => {
    Enderecos.sync({ force: true });
});*/

module.exports = Enderecos;