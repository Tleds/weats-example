const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Shops extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: DataTypes.STRING(11),
        name: DataTypes.STRING(100),
        email: DataTypes.STRING(100),
        telephone: DataTypes.STRING(15),
        cellphone: DataTypes.STRING(15),
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING(100),
        id_access: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: 'shops',
      }
    );
    this.addHook('beforeSave', async (shop) => {
      if (shop.password) {
        shop.password_hash = await bcrypt.hash(shop.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  generateToken() {
    return jwt.sign(
      { id: this.id, id_access: this.id_access },
      process.env.SECRET,
      {
        expiresIn: '7d',
      }
    );
  }

  static associate(models) {
    // this.hasMany(models.Menus, { foreignKey: 'id_shop', as: 'menus' });
    this.belongsTo(models.Shop_types, {
      foreignKey: 'id_shop_type',
      as: 'shop_types',
    });
    this.belongsTo(models.Shoppings, {
      foreignKey: 'id_shopping',
      as: 'shoppings',
    });
    this.belongsTo(models.ShopFiles, {
      foreignKey: 'id_image',
      as: 'shop_files',
    });
  }
}
module.exports = Shops;
