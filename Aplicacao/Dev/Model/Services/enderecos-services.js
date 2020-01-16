'use-strict'
const repository_restaurantes = require('../Repository/repository-restaurantes');

module.exports = {
    async validarEndereco(endereco) {
        let resposta = await repository_restaurantes.readById(endereco.id_restaurante);
        return resposta
    },
    async all(){
        let resposta = await repository_restaurantes.all(endereco);
        return resposta;
    },
    async ReadById(endereco){
        let resposta = await repository_restaurantes.ReadById(endereco.id_restaurante);
        return resposta;
    },
    async create(endereco){
        let resposta = await repository_restaurantes.create(endereco);
        return resposta;
    },
    async update(req){
        let resposta = await repository_restaurantes.update(req);
        return resposta;
    },
    async delete(req){
        let resposta = await repository_restaurantes.delete(req);
        return resposta;
    }
}