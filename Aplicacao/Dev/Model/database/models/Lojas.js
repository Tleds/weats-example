const {Model,DataTypes} = require("sequelize");

class lojas extends Model {
  static init(sequelize){
    super.init({
      cnpj: DataTypes.STRING(11),
      nome :DataTypes.STRING(100),
      email: DataTypes.STRING(100),
      telefone : DataTypes.STRING(10),
      celular : DataTypes.STRING(11),
      senha : DataTypes.STRING(100),
      imagem_loja : DataTypes.STRING(255),
    },
    {
      sequelize
    })
  }
  static associate(models){
    this.hasMany(models.menus_loja, { foreignKey:'id_loja'});
    this.belongsTo(models.shoppings, { foreignKey : 'id_local'});
}
}
module.exports = lojas;
