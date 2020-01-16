const {Model,DataTypes} = require("sequelize");

class promocoes extends Model {
    static init(sequelize){
        super.init({
            titulo_promocao: DataTypes.STRING(100),
            descricao: DataTypes.STRING(255),
            data_inicio: DataTypes.DATE,
            data_fim:DataTypes.DATE,
            cupom: DataTypes.STRING(100),
        },
        {
            sequelize
        })
    }
    static associate(models){
      this.belongsTo(models.restaurantes, { foreignKey: 'id_restaurante'})
      this.belongsTo(models.locals, { foreignKey: 'id_local'})

    }
}
module.exports = promocoes