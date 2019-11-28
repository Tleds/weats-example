'use-strict'

const services_pedidos = require('../Model/Services/pedidos-services')
const validate = require('./functions/validate-functions')


exports.get = (req, res, next) => {
    services_pedidos.all().then(result => {
        res.json(result);
    })
}

exports.post = (req, res, next) => {
    console.log(req.body);
    return;
    req.body.id_usuario = req.userId;
    let pedido = req.body;
    
    if (req.userAccess != 0) {res.status(403).json({ "auth": true, "message": "Acesso negado" });return}
    
    if (!validate.verificaNuloPedido(pedido)) {res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" });return}
    
    services_pedidos.create(req.body).then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json(error);
    })
}
exports.put = (req, res, next) => { //request, responde e next
    req.body.id_usuario = req.userId;
    let pedido = req.body;
    if (req.userAccess != 0) {res.status(403).json({ "auth": true, "message": "Acesso negado" });return}
    
    if (!req.body.id_pedido) {res.status(400).json({ "message": "Identificador inválido" });return}
    
    if (!validate.verificaNuloPedido(pedido)) {res.status(400).json({ "message": "Erro : O atributo não pode ser nulo" });return}
    
    services_pedidos.update(pedido).then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json(error);
    })
    
}
exports.delete = (req, res, next) => { //request, responde e next  
    
    if (req.userAccess != 0) {res.status(403).json({ "auth": true, "message": "Acesso negado" });return}
    
    if (!req.userId) {res.status(400).json({ "message": "Identificador inválido" });return}
    
    services_pedidos.delete(req).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json(error);
    });
}