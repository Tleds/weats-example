const {Model,DataTypes} = require("sequelize");

class restaurantes extends Model {
    static init(sequelize){
        super.init({
            nome:DataTypes.STRING(100),
            cnpj:DataTypes.STRING(14),
            email:DataTypes.STRING(100),
            senha: DataTypes.STRING(100),
            telefone:DataTypes.STRING(100),
            celular:DataTypes.STRING(100),
            id_local:DataTypes.INTEGER,
            id_access:DataTypes.INTEGER,
            imagem_restaurante:DataTypes.TEXT,
            avaliacao:DataTypes.STRING
        },
        {
            sequelize
        })
    }
    static associate(models){
        this.hasMany(models.enderecos, { foreignKey: 'id_restaurante', as: 'enderecos' })
        this.hasMany(models.menus, { foreignKey: 'id_restaurante', as: 'menus' })
        this.hasMany(models.mesas, { foreignKey: 'id_restaurante', as: 'mesas' })
        this.hasMany(models.pagamentos, { foreignKey: 'id_restaurante', as: 'pagamentos' })
        this.hasMany(models.pedidos, { foreignKey: 'id_restaurante', as: 'pedidos' })
        this.hasMany(models.avaliacao_restaurantes, { foreignKey: 'id_restaurante', as: 'Avaliacao_restaurante' })
        this.hasMany(models.avaliacao_produtos, { foreignKey: 'id_restaurante', as: 'Avaliacao_produto' })
        this.hasMany(models.promocoes, { foreignKey: 'id_restaurante', as: 'Promocoes' })
    }
}

module.exports = restaurantes