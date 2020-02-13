'use-strict'
const repository_restaurantes = require('../Repository/restaurantes-repository');
const jwt = require('jsonwebtoken');
const bc = require('bcrypt');

module.exports = {
    async all(local){
        let resposta = await repository_restaurantes.all(local);
        
        resposta.restaurantes.sort(function (a,b){
            return a.avaliacao > b.avaliacao ? -1 : a.avaliacao < b.avaliacao ? 1 : 0;
        })
        return resposta;
    },
    async ReadById(restaurante){
        let resposta = await repository_restaurantes.readById(restaurante);
        return resposta;
    },
    async Catalogo(){
        let resposta = await repository_restaurantes.Catalogo();
        return resposta;
    },
    async validaCnpjRestaurante(cnpj) {
        let resposta = await repository_restaurantes.VerificaCNPJ(cnpj);
        if(!resposta) {return true;}
        return false;
    },
    async validaEmailRestaurante(email) {
        let resposta = await repository_restaurantes.VerificaEmail(email);
        if(!resposta){return true}
        return false;
    },
    async create(restaurante) {
        restaurante.senha = await bc.hash(restaurante.senha,await bc.genSalt(10));
        let resposta = await repository_restaurantes.create(restaurante);
        return resposta;
    },
    async update(req) {
        let resposta = await repository_restaurantes.update(req);
        return resposta;
    },
    async delete(req) {
        let resposta = await repository_restaurantes.delete(req);
        return resposta;
    },
    async verificaLogin(restaurante){
        let resposta = await repository_restaurantes.verifica_login(restaurante);
        if(!resposta.result){return resposta}   

        result = {"id":resposta.id,"id_access":resposta.id_access}
        let token = jwt.sign({ result }, process.env.SECRET)
        
        return { "token": token, "result":true};
    }
}
