'use-strict'
const services_user = require('../Model/Services/usuarios-services'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.

exports.post = (req, res, next) => {
    services_user.verificalogin(req.body).then(result => {
        if (result != null) {
            res.status(200).json(result);
        } else {
            res.status(500).json({ "message": "Login ou senha inválidos" });
        }
    }).catch(error => {
        res.status(404).json({ "message": error });
    });
}