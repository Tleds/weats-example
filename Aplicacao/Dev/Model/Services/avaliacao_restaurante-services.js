const repository_avaliacao_restaurante = require('../Repository/avaliacao_restaurante-repository');
const validate = require('./functions/services-functions');

module.exports = {
  async all(restaurante){
    let resposta = await repository_avaliacao_restaurante.all(restaurante);
    return resposta;
  },
  async ReadById(restaurante){
    let resposta = await repository_avaliacao_restaurante.ReadById(restaurante);
    return resposta;
  },
  async create(restaurante){
    let resposta = await repository_avaliacao_restaurante.create(restaurante);
    return resposta;
  },
  async update(){
    let resposta = await repository_avaliacao_restaurante.update(restaurante);
    return resposta;
  },
  async delete(){
    let resposta = await repository_avaliacao_restaurante.delete(restaurante);
    return resposta;
  },
}