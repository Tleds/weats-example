const repository_avaliacao_produto = require('../Repository/avaliacao_produto-repository');
const validate = require('./functions/services-functions');

module.exports = {
  async all(restaurante){
    let resposta = await repository_avaliacao_produto.all(restaurante);
    return resposta;
  },
  async ReadById(restaurante){
    let resposta = await repository_avaliacao_produto.ReadById(restaurante);
    return resposta;
  },
  async create(restaurante){
    let resposta = await repository_avaliacao_produto.create(restaurante);
    return resposta;
  },
  async update(){
    let resposta = await repository_avaliacao_produto.update(restaurante);
    return resposta;
  },
  async delete(){
    let resposta = await repository_avaliacao_produto.delete(restaurante);
    return resposta;
  },
}