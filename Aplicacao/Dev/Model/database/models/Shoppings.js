const {Model,DataTypes} = require("sequelize");

class shoppings extends Model {
  static init(sequelize){
    super.init({
      nome: DataTypes.STRING(100),
      latitude: DataTypes.STRING(50),
      longitude: DataTypes.STRING(50),
    },
    {
      sequelize
    })
  }
  static associate(models){
    // this.belongsTo(models.restaurantes, { foreignKey: 'local'})
    this.hasMany(models.promocoes, { foreignKey: 'id_local', as: 'Promocoes' })
    this.hasMany(models.lojas, { foreignKey: 'id_local', as: 'Lojas' })
}
}
module.exports = shoppings;
