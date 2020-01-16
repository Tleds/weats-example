const {Model,DataTypes} = require("sequelize");

class status_pedido extends Model {
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING(100)
        },
        {
            sequelize
        })
    }
    static associate(models){
        this.hasMany(models.pedidos, { foreignKey: 'id_status'})
    }
}
module.exports = status_pedido