const db = require('../Repository/connection_string');
const Model = db.Model;

const Status = db.sequelize.define('status_pedido', {
    // attributos
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
    },
{freezeTableName : true});

/*db.sequelize.query("SET FOREIGN_KEY_CHECKS=0").then(() => {
    Status.sync({ force: true });
});*/

module.exports = Status;