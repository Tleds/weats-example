const db = require('../Repository/connection_string');
const Model = db.Model;

const Mesas = db.sequelize.define('mesas', {
    // attributos
    id_restaurante: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'restaurantes',
            key: 'id'
        }
    },
    descricao: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    }
});

/*db.sequelize.query("SET FOREIGN_KEY_CHECKS=0").then(() => {
    Mesas.sync({ force: true });
})*/
module.exports = Mesas;