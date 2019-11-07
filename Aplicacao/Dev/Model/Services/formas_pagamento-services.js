'use-strict'
const repository_forma_pagamento = require('../Repository/formas_pagamento-repository');


exports.all = function() {
    return repository_forma_pagamento.all().then(result => {
            return {
                "message": result,
                "result": true
            };
        })
        .catch(error => {
            return {
                "message": error,
                "result": false
            };
        })
}
exports.create = function(forma_pagamento) {
    return repository_forma_pagamento.create(forma_pagamento).then(result => {
        return {
            "message": "Forma de pagamento cadastrado com sucesso",
            "result": true
        };
    }).catch(error => {
        return {
            "message": error,
            "result": false
        };
    });
}
exports.update = function(req) {
    return repository_forma_pagamento.update(req).then(result => {
        return {
            "message": "Forma de pagamento alterada com sucesso",
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
    return repository_forma_pagamento.delete(req).then(result => {
        return {
            "message": "Forma de pagamento deletada com sucesso",
            "result": true
        };
    }).catch(error => {
        return {
            "message": error,
            "result": false
        };
    });
}