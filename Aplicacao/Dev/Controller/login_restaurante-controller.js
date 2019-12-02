'use-strict'
const services_restaurantes = require('../Model/Services/restaurantes-services'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const validate = require('./functions/validate-functions');
module.exports = {

    async post(req, res, next){
        if (!validate.verificaNuloLoginRest(req.body)) {res.status(400).json({ "message": "Erro - Atributos nullos" });return}
        
        let resposta = await services_restaurantes.verificaLogin(req.body);
        if(!resposta.result){res.status(403).json(resposta);return} 
        
        res.status(200).json(resposta);
        return
    }
}