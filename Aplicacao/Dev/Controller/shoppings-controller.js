'use-strict'
const services_shoppings = require('../Model/Services/shoppings-services');
const validate = require('./functions/validate-functions');

module.exports = {
    //Vem da API de restaurantes
    async  get(req, res, next){
        req.localizacao = {
            'latitude' : -19.9552473,
            'longitude' : -44.0675008,
        }
        let resposta = await services_shoppings.all(req.localizacao);

        if(resposta.result)

        res.status(200).json(resposta);
        return
    },
    async  post(req, res, next){
        
    },
    async  put(req, res, next){ //request, responde e next
        
    },
    async  delete(req, res, next){ //request, responde e next   

    }
}
