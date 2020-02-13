'use-strict'
const repository_promocoes = require('../Repository/promocoes-repository');
const utils = require('./functions/services-functions');

module.exports = {
    async all(localizacao){
        let resposta = await repository_promocoes.all();
        if(!localizacao){return resposta}
        if (!resposta.result){return resposta};
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

        return json_final;
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
