const db = require('../Repository/connection_string');
const Model = db.Model;

const Forma_Pagamento = db.sequelize.define('formas_pagamento', {
    // attributos
    descricao: {
        type: db.Sequelize.STRING(255),
        allowNull: false
    },
    tipo_forma_pagamento: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    bandeira: {
        type: db.Sequelize.STRING(255),
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: 'formas_pagamento'
});
/*db.sequelize.query("SET FOREIGN_KEY_CHECKS=0").then(() => {
    Forma_Pagamento.sync({ force: true });
});*/

module.exports = Forma_Pagamento;