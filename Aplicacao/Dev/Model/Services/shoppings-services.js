'use-strict'
const services_shoppings = require('../Repository/shoppings-repository');
const utils = require('./functions/services-functions');

module.exports = {
    async all(localizacao){
        let json_final = [];
        let resposta = await services_shoppings.all();
        console.log(localizacao)
        if(!localizacao)
        {return resposta}

        if (!resposta.result){return resposta};

        JSON.parse(localizacao);
        //Calculando a distância
        resposta.message.forEach(item => {
            let coordenadas_shopping = {
                'latitude':Number(item.latitude),
                'longitude':Number(item.longitude),
            }
            let distance = utils.getDistance(localizacao,coordenadas_shopping);
            json_final.push({
                'id': item.id,
                'nome':item.nome,
                'distancia':Math.round(distance),
            })
        });
        //Ordenando o array
        json_final.sort(function(a,b){
            return a.distancia < b.distancia ? -1 : a.distancia > b.distancia ? 1 : 0;
        })
        resposta.message = json_final;
        return resposta;
    },
    async create(shopping) {
        let resposta = await services_shoppings.create(restaurante);
        return resposta;
    },
    async update(req) {
        let resposta = await services_shoppings.update(req);
        return resposta;
    },
    async delete(req) {
        let resposta = await services_shoppings.delete(req);
        return resposta;
    }
}
