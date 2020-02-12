const {Model,DataTypes} = require("sequelize");

class classificacoes_loja extends Model {
  static init(sequelize){
    super.init({
      nome :DataTypes.STRING(100),      
    },
    {
      sequelize
    })
  }
  static associate(models){
    this.hasMany(models.menus_loja, { foreignKey : 'id_classificacao'});
}
}
module.exports = classificacoes_loja;
