const {Model,DataTypes}= require('sequelize');

class avaliacao_restaurantes extends Model{
    static init(sequelize){
        super.init({
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
    }
} 

module.exports = avaliacao_restaurantes;    