const {Model,DataTypes} = require("sequelize");

class menus_loja extends Model {
  static init(sequelize){
    super.init({
      nome :DataTypes.STRING(100),
      marca: DataTypes.STRING(100),
      descricao : DataTypes.STRING(255),
      preco : DataTypes.DOUBLE,
    },
    {
      sequelize
    })
  }
  static associate(models){
    this.belongsTo(models.lojas, { foreignKey : 'id_loja'});
    // this.belongsTo(models.classificoes_loja, { foreignKey : 'id_classificacao'});
}
}
module.exports = menus_loja;
