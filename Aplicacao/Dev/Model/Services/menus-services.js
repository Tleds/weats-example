'use-strict'
const repository_menus = require('../Repository/menus-repository');
const repository_restaurantes = require('../Repository/restaurantes-repository');
exports.validaRestaurante = function(menu) {
    return repository_restaurantes.readById(menu.id_restaurante).then(result => {
        if (result != null) {
            return true;
        } else {
            return false;
        }
    });
}
exports.all = function() {
    return repository_menus.all().then(menu => {
        return {
            "message": menu,
            "result": true
        };
    }).catch(error => {
        return {
            "message": error,
            "result": false
        };
    });
}
exports.create = function(menu) {
    return repository_menus.create(menu).then(() => {
        return {
            "message": "Menu cadastrado com sucesso",
            "result": true
        };
    }).catch(error => {
        return {
            "message": error,
            "result": false
        };
    })
}
exports.update = function(req) {
    return repository_menus.update(req).then(() => {
        return {
            "message": "Menu alterado com sucesso",
            "result": true
        };
    }).catch(error => {
        return {
            "message": error,
            "result": false
        };
    });
}
exports.delete = function(req) {
    return repository_menus.delete(req).then(() => {
        return {
            "message": "Menu deletado com sucesso",
            "result": true
        };
    }).catch(error => {
        return {
            "message": error,
            "result": false
        };
    });
}