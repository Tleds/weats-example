const pedidos = require('./Model/database/models/Pedidos');
// const pedidos = require('./Model/Entities/Pedidos');
require('./Model/database/index');

pedidos.create({
  id_restaurante:1,
  id_mesa:29,
  id_usuario:2,
  id_status:1,
  produto:'Coca-cola',
  quantidade:1,
  preco_pedido:10.00,
  observacao:'',
  senha:14123
})

