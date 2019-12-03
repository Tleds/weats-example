'use-strict'

const services_pedidos = require('../Model/Services/pedidos-services')
const validate = require('./functions/validate-functions')

module.exports = {
    async get (req, res, next){
        let dados = await services_pedidos.ReadById(req.userId);
        if(!dados.result){res.status(500).json(dados);return}

        res.status(200).json(dados);
        return
    },    
    async post(req, res, next){
        req.body.id_usuario = req.userId;
        let pedido = req.body;
        
        if (req.userAccess != 0) {res.status(403).json({ "auth": true, "message": "Acesso negado","result":false });return}
        
        if (!validate.verificaNuloPedido(pedido)) {res.status(400).json({ "message": "Erro : O atributo não pode ser nulo","result":false });return}
        
        let resposta = await services_pedidos.create(req.body);
        if(!resposta.result){res.status(500).json(resposta);return}
        
        res.status(200).json(resposta);
        return
    },
    async put(req, res, next){ //request, responde e next
        req.body.id_usuario = req.userId;
        let pedido = req.body;

        if (req.userAccess != 0) {res.status(403).json({ "auth": true, "message": "Acesso negado" });return}
        
        if (!req.body.id_pedido) {res.status(400).json({ "message": "Identificador inválido" });return}
        
        if (!validate.verificaNuloPedido(pedido)) {res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" });return}
        
        let resposta = await services_pedidos.update(pedido);
        if(!resposta.result){res.status(500).json(resposta);return}
        
        res.status(200).json(resposta);
        return
    },
    async delete(req, res, next){ //request, responde e next  
        const {id_pedido} = req.body
        if (req.userAccess != 0) {res.status(403).json({ "auth": true, "message": "Acesso negado" });return}
        
        if (!req.userId) {res.status(400).json({ "message": "Identificador inválido" });return}
        
        let resposta = await services_pedidos.delete(id_pedido);
        if(!resposta.result){res.status(200).json(resposta);return}
        
        res.status(200).json(resposta);
        return
        
    }
}
