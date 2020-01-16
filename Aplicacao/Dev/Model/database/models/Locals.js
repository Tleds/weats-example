const {Model,DataTypes} = require("sequelize");

class locals extends Model {
  static init(sequelize){
    super.init({
      nome: DataTypes.STRING(100)
    },
    {
      sequelize
    })
  }
  static associate(models){
    // this.belongsTo(models.restaurantes, { foreignKey: 'local'})
    this.hasMany(models.promocoes, { foreignKey: 'id_local', as: 'Promocoes' })

}
}
module.exports = locals;
