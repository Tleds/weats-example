const db = require('../Repository/connection_string');
const Model = db.Model;

const Pedido = db.sequelize.define('pedidos', {
    // attributos
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
    id_usuario: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade'
    },
    produto: {
        type: db.Sequelize.STRING(50),
        allowNull: false
    },
    quantidade: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    observacao: {
        type: db.Sequelize.TEXT,
        allowNull: true
    },
    id_status: {
        type: db.Sequelize.INTEGER,
        defaultValue : 1,
        references: {
            model: 'status_pedido',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'cascade'
    },
    preco_pedido: {
        type: db.Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    senha: {
        type: db.Sequelize.STRING(10),
        allowNull:false
    }
});

/*db.sequelize.query("SET FOREIGN_KEY_CHECKS=0").then(() => {
    Pedido.sync({ force: true });
});*/
module.exports = Pedido;