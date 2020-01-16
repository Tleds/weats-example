'use-strict'
const services_menus = require('../Model/Services/menus-services'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const validate = require('./functions/validate-functions')

module.exports = {
    async get(req, res, next){
        if(!req.headers.id_restaurante || !req.headers.id_mesa)
        {res.status(400).json({"message":"restaurante e mesa não podem ser nulos", "result":false});return}
        let resposta = await services_menus.all(req);
        if(!resposta.result){res.status(500).json(resposta);return}
        
        res.status(200).json(resposta);
        return
        
    },
    async post(req, res, next){
        let menu = req.body;
        
        if (req.userAccess != 1 && req.userAccess != 10) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        
        if (validate.verificaNuloMenu(menu)) {res.status(400).json({ "message": "Erro : O atributo não pode ser nullo" });return}
        
        let valida_restaurante = await services_menus.validaRestaurante(menu);
        if (!valida_restaurante) {res.status(400).json({ "message": "O restaurante não existe" });return}
        
        let resposta = await services_menus.create(menu);
        if(!resposta.result){res.status(500).json(resposta);return}
        
        res.status(500).json(resposta);
        return
    },
    async put(req, res, next){ //request, responde e next
        let menu = req.body;
        
        if (req.userAccess != 1 && req.userAccess != 10) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        
        if (!req.body.id_menu) {res.status(400).json({ "message": "Identificador inválido" });return}
        
        if (!validate.verificaNuloMenu(menu)) {res.status(400).json({ "message": "Erro : O atributo não pode ser nullo" });return}
        
        let resposta = await services_menus.update(req);
        if(!resposta.result){res.status(500).json(resposta);}
        res.status(200).json(resposta);
        return

    },
    async delete(req, res, next){ 
        if (req.userAccess != 1 && req.userAccess != 10) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        
        if (req.params.ident != "") {res.status(400).json({ "message": "Identificador inválido" });return}
        
        let resposta = await services_menus.delete(req)
        if(!resposta.result){res.status(500).json(resposta);return}
        res.status(200).json(resposta);
        return
    }
}