const {Model,DataTypes} = require("sequelize");

class formas_pagamento extends Model {
static init(sequelize){
        super.init({
            descricao: DataTypes.STRING(255),
            tipo_forma_pagamento:DataTypes.STRING(100),
            bandeira:DataTypes.STRING(255),
        },
        {
            sequelize
        })
    }
}
module.exports = formas_pagamento