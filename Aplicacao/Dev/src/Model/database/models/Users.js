const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(100),
        email: DataTypes.STRING(100),
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING(100),
        telephone: DataTypes.STRING(15),
        cpf: DataTypes.STRING(11),
        id_access: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: 'users',
      }
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
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
    this.hasMany(models.Solicitations, {
      foreignKey: 'id_user',
      as: 'solicitation',
    });
    this.hasMany(models.Shop_payments, {
      foreignKey: 'id_user',
      as: 'shop_payments',
    });
    this.hasMany(models.Parking_payments, {
      foreignKey: 'id_user',
      as: 'parking_payments',
    });
    this.hasMany(models.Shops_rating, {
      foreignKey: 'id_user',
      as: 'shop_rating',
    });
    this.hasMany(models.Products_rating, {
      foreignKey: 'id_user',
      as: 'product_rating',
    });
  }
}

module.exports = Users;
