const {Model,DataTypes}= require('sequelize');

class enderecos extends Model{
    static init(sequelize){
        super.init({
        id_restaurante: DataTypes.INTEGER(10),
        rua: DataTypes.STRING(255),
        numero:DataTypes.INTEGER(10),
        bairro: DataTypes.STRING(100),
        cidade: DataTypes.STRING(100),
        cep: DataTypes.STRING(8),
        uf: DataTypes.STRING(2),
        pais: DataTypes.STRING(100),
        localizacao: DataTypes.STRING(255),
        },
        {
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.restaurantes, { foreignKey: 'id_restaurante'})
    }
} 

module.exports = enderecos;    