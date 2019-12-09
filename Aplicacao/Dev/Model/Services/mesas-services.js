'use-strict'
const repository_mesas = require('../Repository/mesas-repository');
const qr_code = require('qrcode');
const ct = require('../Repository/criptografia');
const services_functions = require('./functions/services-functions')

module.exports = {

    async all(id) {
        let resposta = await repository_mesas.all(id);
        return resposta;
    },
    async create(mesa) {
        let resposta = await repository_mesas.create(mesa);
        return resposta;
    },
    async update(req) {
        let resposta = repository_mesas.update(req);
        return resposta;
    },
    async delete(id) {
        let resposta = await repository_mesas.delete(id);
        return resposta;
    },
    async GerarPdf(dados){
        dados = ct.cp(dados);
        console.log(dados);
        let result = await qr_code.toDataURL(dados);
        let resposta = await services_functions.GerarPdf(result);
        return resposta;
    }
}