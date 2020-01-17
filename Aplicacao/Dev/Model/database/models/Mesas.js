const {Model,DataTypes} = require("sequelize");

class mesas extends Model {
    static init(sequelize){
        super.init({
            id_restaurante: DataTypes.INTEGER,
            descricao:DataTypes.STRING(100),
        },
        {
            sequelize
        })
    }
    static associate(models){
        this.hasMany(models.pedidos, { foreignKey: 'id_mesa', as: 'mesas' })
    }
}
    
module.exports = mesas