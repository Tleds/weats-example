module.exports = (sequelize, DataTypes)=>{
const Pedidos = sequelize.define('pedidos', {
    // attributos
    id_restaurante:DataTypes.INTEGER,
    id_mesa:DataTypes.INTEGER,
    id_usuario:DataTypes.INTEGER,
    produto:DataTypes.STRING(50),
    quantidade: DataTypes.INTEGER,
    observacao:DataTypes.TEXT,
    id_status: DataTypes.INTEGER,
    preco_pedido:DataTypes.DECIMAL(10, 2),
    senha: DataTypes.String(10),
});
return Pedidos;
}