'use-strict'
const repository_restaurantes = require('../Model/Repository/restaurantes-repository'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const services = require('../Model/Services/restaurantes-services');
const validate = require('./functions/validate-functions');

module.exports = {
    async getShopping(req, res, next){
        if (req.userAccess == 0 || req.userAccess == 10) {
            repository_restaurantes.all(req.headers.local).then(restaurante => {
                res.json({ "id_mesa":req.headers.id_mesa, restaurante: restaurante }); //retorna o json com os usuários
            });
        } else {
            res.status(403).json({ "auth": false, "message": "Acesso negado" });
        }
    },
    async  getId(req, res, next){
        if (req.userAccess != 0 || req.userAccess != 10) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        let resposta = await repository_restaurantes.all(req.headers.local);
        if(!resposta.result){res.status(500).json(resposta);return}

        res.json(resposta); //retorna o json com os usuários
        return
    },
    async  post(req, res, next){
        let restaurante = req.body;
        if (validate.verificaNuloRestaurantes(restaurante) && (restaurante.senha != "" && typeof restaurante.senha != 'undefined')) {
            services.validaEmailRestaurante(req.body).then(email => {
                if (email > 0) {
                    res.status(500).json({ "message": "E-mail já cadastrado" });
                }
                if (email == 0) {
                    services.validaCnpjRestaurante(req.body).then(cnpj =>{
                        if (cnpj == 0) {
                            services.create(req.body).then(result =>{
                                    res.status(200).json(result);
                                })
                                .catch(error => {
                                    res.status(404).json(error);
                                })
    
                        } else {
                            res.status(400).json({ "message": "CNPJ já cadastrado" });
                        }
                    });
                }
            });
        } else {
            res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" });
        }
    },
    async  put(req, res, next){ //request, responde e next
        /*let restaurante = req.body;
        if (req.userId != null) { //verificando o parâmetro da requisição
            if (validate.verificaNuloRestaurantes(restaurante)) {
                if (req.body.email != null) {
                    services.validaCnpjRestaurante(restaurante).then(cnpj{
                        if (cnpj == 1) {
                            services.atualiza(req).then(result{
                                    res.status(200).json(result);
                                })
                                .catch(error{
                                    res.status(404).json(error);
                                })
                        } else {
                            res.status(400).json({ "message": "CNPJ inválido" });
                        }
                    });
                } else {
                    res.status(400).json({ "message": "Email nulo" });
                }
            } else {
                res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" });
            }
        } else {
            res.status(403).json({ "message": "Identificador inválido" });
        }*/
    },
    async  delete(req, res, next){ //request, responde e next   
        /*if (req.userId != null) { //verificando o parâmetro da requisição
            services.delete(req).then(result{
                    res.status(200).json(result);
                })
                .catch(error{
                    res.status(404).json(error);
                })
        } else {
            res.status(403).json({ "message": "Identificador inválido" });
        }*/
    }
}
