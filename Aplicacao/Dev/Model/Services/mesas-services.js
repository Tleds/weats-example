'use-strict'
const repository_mesas = require('../Repository/mesas-repository');

exports.all = function() {
    return repository_mesas.all().then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
}
exports.create = function(mesa) {
    return repository_mesas.create(mesa).then(result => {
            return result;
        })
        .catch(error => {
            return error
        })
}
exports.update = function(req) {
    return repository_mesas.update(req).then(result => {
            return result;
        })
        .catch(error => {
            return error
        })
}
exports.delete = function(req) {
    return repository_mesas.delete(req).then(result => {
            return result;
        })
        .catch(error => {
            return error
        })
}