const {Model,DataTypes} = require("sequelize");

class menus extends Model {
    static init(sequelize){
        super.init({
            id_restaurante: DataTypes.INTEGER,
            produto: DataTypes.STRING(100),
            secao: DataTypes.STRING(100),
            preco: DataTypes.DECIMAL(10, 2),
            descricao_produto: DataTypes.TEXT,
            tipo_produto:DataTypes.STRING(50),
            imagem_produto: DataTypes.TEXT,
        },
        {
            sequelize
        })
    }
    static associate(models){
        this.hasMany(models.Avaliacao_produtos, { foreignKey: 'id_produto', as: 'Avaliacao_produto' })
    }
}
module.exports = menus