const {Model,DataTypes} = require("sequelize");

class usuarios extends Model {
    static init(sequelize){
        super.init({
            nome:DataTypes.STRING(100),
            email:DataTypes.STRING(100),
            senha:DataTypes.STRING(100),
            telefone:DataTypes.STRING(15),
            cpf:DataTypes.STRING(11),
            id_access:DataTypes.INTEGER
        },{
            sequelize
        })
    }
    static associate(models){
        this.hasMany(models.pedidos, { foreignKey: 'id_usuario', as: 'pedidos'})
        this.hasMany(models.pagamentos, { foreignKey: 'id_usuario', as:'pagamentos'})
        this.hasMany(models.Avaliacao_restaurantes, { foreignKey: 'id_usuario', as: 'Avaliacao_restaurante' })
        this.hasMany(models.Avaliacao_produto, { foreignKey: 'id_usuario', as: 'Avaliacao_produto' })
    }
}

module.exports = usuarios
