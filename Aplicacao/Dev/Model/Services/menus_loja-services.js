'use-strict'
const repository_menus_loja = require('../Repository/menus_loja-repository');

module.exports = {
    async all(id_loja) {
      let resposta = await repository_menus_loja.all(id_loja);
        return resposta;
    },
    async create(menu) {
        let resposta = await repository_menus_loja.create(menu);
        return resposta;
    },
    async update(menu) {
        let resposta = await repository_menus_loja.update(menu);
        return resposta;
        
    },
    async delete(id) {
        let resposta = await repository_menus_loja.delete(id);
        return resposta;
    }
}