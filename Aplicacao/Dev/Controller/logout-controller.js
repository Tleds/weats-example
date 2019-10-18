'use-strict'
const repository_user = require('../Model/Repository/usuarios-repository'); //O repository só vai ser usado para métodos simples que não possuem regras de negócio.
const jwt = require('jsonwebtoken');

exports.get = (req, res, next) => {
    res.status(200).json({ auth: false, "token": null })
}