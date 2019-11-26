'use-strict'
const services_user = require('../Model/Services/usuarios-services'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const validate = require('./functions/validate-functions')
exports.post = (req, res, next) => {
    if (validate.verificaNuloLogin(req.body)) {
        services_user.verificalogin(req.body).then(result => {
            if (result.result == true) {
                res.status(200).json(result);
            }
            if(result.result === '' && result.message === undefined){
                res.status(500).json({ "message": "Login ou senha inválidos", "result":false});
            }
            if((result.result == false && result.error !== undefined))
            {
                res.status(500).json(result)
            } 
        }).catch(error => {
            res.status(404).json({ "message": error });
        });
    } else {
        res.status(500).json({ "message": "Erro - Atributos nullos" });
    }
}