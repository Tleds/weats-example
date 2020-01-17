const repository_lista_pedidos = require('../Repository/lista_pedidos-repository');

module.exports = {
  async listaPedidos(id){
    let resposta = await repository_lista_pedidos.listaPedidos(id);
    return resposta;
  }
}