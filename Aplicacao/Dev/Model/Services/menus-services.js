'use-strict'
const repository_menus = require('../Repository/menus-repository');
const repository_restaurantes = require('../Repository/restaurantes-repository');

module.exports = {

    async validaRestaurante(menu) {
        let resposta = await repository_restaurantes.readById(menu.id_restaurante);
        return resposta;
    },
    async all(req) {
        let resposta = await repository_menus.all(req)
        return {
            "id_mesa":req.headers.id_mesa,
            "message":resposta.message
        };
        
    },
    async create(menu) {
        let resposta = await repository_menus.create(menu);
        return resposta
    },
    async update(req) {
        let resposta = await repository_menus.update(req);
        return resposta
        
    },
    async delete(req) {
        let resposta = await repository_menus.delete(req);
        return resposta;
    }
}