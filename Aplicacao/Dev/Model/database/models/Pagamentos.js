const {Model,DataTypes} = require("sequelize");

class pagamentos extends Model {
    static init(sequelize){
        super.init({
            preco_final:DataTypes.DECIMAL(10, 2)
        },
        {
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.restaurantes, { foreignKey: 'id_restaurante'})
        this.belongsTo(models.formas_pagamento, { foreignKey: 'id_forma_pagamento'})
        this.belongsTo(models.usuarios, { foreignKey: 'id_usuario'})
        this.belongsTo(models.mesas, { foreignKey: 'id_mesa'})
        this.belongsTo(models.pedidos, { foreignKey: 'id_pedido'})
    }
}

module.exports = pagamentos