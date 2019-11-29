'use-strict'
const services_user = require('../Model/Services/usuarios-services'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const validate = require('./functions/validate-functions');
module.exports = {
async post(req, res, next){
    if (!validate.verificaNuloLogin(req.body)) {res.status(400).json({ "message": "Erro - Atributos nullos" }); return}
    
    let resposta = await services_user.verificalogin(req.body)
    if(!resposta.result){res.status(403).json({ "message": "Login ou senha inválidos", "result":false}); return}
    
    res.status(200).json(resposta); 
    return           
    
}
}