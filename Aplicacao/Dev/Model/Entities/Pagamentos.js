const db = require('../Repository/connection_string');
const Model = db.Model;

const Pagamento = db.sequelize.define('pagamentos', {
    // attributos
    id_forma_pagamento: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'formas_pagamento',
            key: 'id'
        },
        allowNull: false
    },
    id_usuario: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade'
    },
    id_restaurante: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'restaurantes',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade'
    },
    id_mesa: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'mesas',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade'
    },
    id_pedido: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'pedidos',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade'
    },
    preco_final: {
        type: db.Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
});
/*db.sequelize.query("SET FOREIGN_KEY_CHECKS=0").then(() => {
    Pagamento.sync({ force: true });
});*/

module.exports = Pagamento;