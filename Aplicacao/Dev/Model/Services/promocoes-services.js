'use-strict'
const repository_promocoes = require('../Repository/promocoes-repository');
const utils = require('./functions/services-functions');

module.exports = {
    async all(id){
      
        let resposta = await repository_promocoes.all(id);
        return resposta;
    },
    async ReadById(id){
      let resposta = await repository_promocoes.ReadById(id);
      return resposta;
    },
    async create(promocao) {
      let resposta = await repository_promocoes.create(promocao);
      return resposta;
    },
    async update(req) {
      let resposta = await repository_promocoes.update(req);
      return resposta;
    },
    async delete(id) {
      let resposta = await repository_promocoes.delete(id);
        return resposta;
    },
}
