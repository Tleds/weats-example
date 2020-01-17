const lista_pedidos = require('../database/models/Pedidos');
require('../database/index');

module.exports = {
  async listaPedidos(id){
    let resposta = await lista_pedidos.findAll({raw:true})
    .catch(e=>{
      return {"message":e,"result":false}
    });
    if(!resposta){return {"message":"Identificador não encontrado","result":false}}
    return {"message":resposta,"result":true}
  }
}