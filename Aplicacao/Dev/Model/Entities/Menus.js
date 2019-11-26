const db = require('../Repository/connection_string');
const Model = db.Model;

const Menus = db.sequelize.define('menus', {
    // attributos
    id_restaurante: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'restaurantes',
            key: 'id'
        },
        onDelete: 'cascade'
    },
    produto: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    secao: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    preco: {
        type: db.Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    descricao_produto: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    tipo_produto: {
        type: db.Sequelize.STRING(50),
        allowNull: false
    },
    imagem_produto: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
});

/*db.sequelize.query("SET FOREIGN_KEY_CHECKS=0").then(() => {
    Menus.sync({ force: true });
})*/
module.exports = Menus;