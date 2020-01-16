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
}
    
module.exports = mesas