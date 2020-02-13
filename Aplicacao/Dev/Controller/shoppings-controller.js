'use-strict'
const services_shoppings = require('../Model/Services/shoppings-services');
const validate = require('./functions/validate-functions');

module.exports = {
    //Vem da API de restaurantes
    async  get(req, res, next){
        console.log(req.headers.localizacao)
        let resposta = await services_shoppings.all(req.headers.localizacao);
        
        if(!resposta.result){res.status(500).json(resposta)}

        res.status(200).json(resposta);
        return
    },
    async post(req, res, next){
        let shopping = req.body;
        let resposta = await services_shoppings.create(shopping);

        if(!resposta.result){return res.status(500).json(resposta)}

        res.status(200).json(resposta);
        return
    },
    async put(req, res, next){ //request, responde e next
        
    },
    async delete(req, res, next){ //request, responde e next   

    }
}
