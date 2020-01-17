'use-strict'
const services_mesas = require('../Model/Services/mesas-services');
const validate = require('./functions/validate-functions')

module.exports = {

    async get(req, res, next){
        if (req.userAccess != 1 && req.userAccess != 10) 
        {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        
        let resposta = await services_mesas.all(req.userId);
        if(!resposta.result){res.status(500).json(resposta);return}
        
        res.status(200).json(resposta);
        return
    },
    async post(req, res, next){
        let mesa = req.body;
        if (!validate.verificaNuloMesa(mesa)) {res.status(400).json({ "message": "Erro : O atributo não pode ser nulo","result":false });return}
        
        if (req.userAccess != 1 && req.userAccess != 10) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        //Cadastra a mesa no banco de dados
        let resposta = await services_mesas.create(mesa);
        if(!resposta.result){res.status(500).json(resposta);return}
        mesa.id_mesa = resposta.id_mesa
        const {id_restaurante,local, id_mesa} = mesa;
        let dados = {"restaurante" : id_restaurante,"local":local,"id_mesa":id_mesa};
        //Gera o QrCode da mesa
        resposta = await services_mesas.GerarPdf(dados);
        if(!resposta.result){res.status(500).json({"Erro":"Erro ao gerar o pdf"});return}
        
        res.status(200).json({"message":"Códigos gerados com sucesso","result":true});
        return
       
    },
    async put(req, res, next){ //request, responde e next
        let mesa = req.body;
        if (req.userAccess != 1 && req.userAccess != 10) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        if (req.userId) {res.status(400).json({ "message": "Identificador inválido" });return}
        
        mesa.id_restaurante = req.userId;
        if (!validate.verificaNuloMesa(mesa) && !mesa.id_mesa) {res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" });return}
        
        let resposta = await services_mesas.update(mesa);
        if(resposta.result){res.status(500).json(resposta);return}
        
        res.status(200).json(resposta);
        return;
    },
    async delete(req, res, next){ //request, responde e next  
        const {id_mesa} = req.body; 
        if (req.userAccess != 1 && req.userAccess != 10) {res.status(403).json({ "auth": false, "message": "Acesso negado" });return}
        if (!id_mesa && !req.userId) {res.status(400).json({ "message": "Identificador inválido" });return}
        
        let resposta = await services_mesas.delete(id_mesa);
        if(resposta.result){res.status(500).json(resposta);return}
        
        res.status(200).json(resposta);
        return            
    }
}