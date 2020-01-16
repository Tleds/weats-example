const {Model,DataTypes}= require('sequelize');

class avaliacao_produtos extends Model{
    static init(sequelize){
        super.init({
        id_produto: DataTypes.INTEGER,
        id_restaurante: DataTypes.INTEGER,
        id_usuario:DataTypes.INTEGER,
        avaliacao: DataTypes.DOUBLE,
        descricao: DataTypes.STRING(255),
        },
        {
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.restaurantes, { foreignKey: 'id_restaurante'})
        this.belongsTo(models.usuarios, { foreignKey: 'id_usuario'})
        this.belongsTo(models.menus, { foreignKey: 'id_produto'})
    }
} 

module.exports = avaliacao_produtos;    