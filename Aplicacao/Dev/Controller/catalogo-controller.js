'use-strict'
const services_restaurante = require('../Model/Services/restaurantes-services');

module.exports = {
    async get(req, res, next){

        if (req.userAccess != 0) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}

        let resposta = await services_restaurante.Catalogo(req.headers.local);
        if(!resposta.result){res.status(500).json(resposta);return}
        res.status(200).json(resposta); //retorna o json com os usuários
        return
    }
}
