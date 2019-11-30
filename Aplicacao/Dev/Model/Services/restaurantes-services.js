'use-strict'
const repository_restaurantes = require('../Repository/restaurantes-repository');
const jwt = require('jsonwebtoken');

module.exports = {
    async Catalogo(){
        let resposta = await repository_restaurantes.Catalogo();
        return resposta;
    },
    async validaCnpjRestaurante(restaurante) {
        let resposta = await repository_restaurantes.VerificaCNPJ(restaurante).then(result => {
        return resposta;
        });
    },
    async validaEmailRestaurante(restaurante) {
        let resposta = await repository_restaurantes.VerificaEmail(restaurante).then(result => {
        return resposta;
        });
    },
    async create(restaurante) {
        return repository_restaurantes.create(restaurante).then(() => {
            return {
                "message": "Restaurante cadastrado com sucesso",
                "result": true
            };
        }).catch(error => {
            return {
                "message": error,
                "result": false
            };
        });
    },
    async atualiza(req) {
        return repository_restaurantes.update(req).then(() => {
            return {
                "message": "Restaurante alterado com sucesso",
                "result": true
            };
        }).catch(error => {
            return {
                "message": error,
                "result": false
            };
        });
    },
    async delete(req) {
        return repository_restaurantes.delete(req).then(() => {
            return {
                "message": "Restaurante deletado com sucesso",
                "result": true
            };
        }).catch(error => {
            return {
                "message": error,
                "result": false
            };
        });
    },
    async verificaLogin(restaurante){
        return repository_restaurantes.verifica_login(restaurante).then(result => {
            if(result != null)
            {
                result = result.dataValues
                let token = jwt.sign({ result }, process.env.SECRET, {
                    expiresIn: 1440 //24H
                })
                return { "token": token, "result":true};
            }else{
                return {"result":""};
            }
            })
            .catch(error => {
                return {"error":error, "result":false};
            })
    }
}
