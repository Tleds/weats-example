const repository_lojas = require('../Repository/lojas-repository');
const bc = require('bcrypt');
const validate_services = require('./functions/services-functions');

module.exports = {
  async all(){

  },
  async validaEmail(email){
    let resposta = await repository_lojas.validaEmail(email);
    return resposta;
  },
  async validaCNPJ(cnpj){
    let resposta = await repository_lojas.validaCNPJ(cnpj);
    return resposta;
  },
  async readById(id){
    let resposta = await repository_lojas.readById(id);
    return resposta;
  },
  async create(loja){
    loja.senha = await bc.hash(loja.senha, await bc.genSalt(10));
    let resposta = await repository_lojas.create(loja);
    return resposta;
  },
  async update(loja){
    let resposta = await repository_lojas.update(loja);
    return resposta;
  },
  async delete(id){
    let resposta = await repository_lojas.delete(id);
    return resposta;

  }
}