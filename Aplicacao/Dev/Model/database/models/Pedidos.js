const {Model, DataTypes} = require('sequelize');

class pedidos extends Model{
    static init(sequelize){
    super.init({
    produto:DataTypes.STRING(50),
    quantidade: DataTypes.INTEGER,
    observacao:DataTypes.TEXT,
    preco_pedido:DataTypes.DECIMAL(10, 2),
    senha: DataTypes.STRING(10),
    }, {
        sequelize
    })
    }
    static associate(models){
        this.belongsTo(models.restaurantes, { foreignKey: 'id_restaurante'})
        this.belongsTo(models.usuarios, { foreignKey: 'id_usuario'})
        this.belongsTo(models.mesas, { foreignKey: 'id_mesa'})
        this.belongsTo(models.status_pedido, { foreignKey: 'id_status'})
    }
}
module.exports = pedidos
