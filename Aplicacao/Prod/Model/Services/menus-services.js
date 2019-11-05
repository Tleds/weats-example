'use-strict'
const repository_menus = require('../Repository/menus-repository');
const repository_restaurantes = require('../Repository/restaurantes-repository');
exports.validaRestaurante = function(menu) {
    return repository_restaurantes.readById(menu.id_restaurante).then(result => {
        console.log(result)
        if (result != null) {
            return true;
        } else {
            return false;
        }
    });
}
exports.all = function() {
    return repository_menus.all().then(function(menu) {
        return { menu: menu }
    }).catch(error => {
        return { "message": error }
    });
}
exports.create = function(menu) {
    return repository_menus.create(menu).then(() => {
        return { "message": "Menu cadastrado com sucesso" };
    }).catch(error => {
        return { "message": error };
    })
}