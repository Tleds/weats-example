'use-strict'
const repository_forma_pagamento = require('../Repository/formas_pagamento-repository');


exports.all = function() {
    return repository_forma_pagamento.all().then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
}
exports.create = function(forma_pagamento) {
    return repository_forma_pagamento.create(forma_pagamento).then(result => {
        return result;
    }).catch(error => {
        return error;
    });
}
exports.update = function(req) {
    return repository_forma_pagamento.update(req).then(result => {
        return result;
    }).catch(error => {
        return error;
    });
}
exports.delete = function(req) {
    return repository_forma_pagamento.delete(req).then(result => {
        return result;
    }).catch(error => {
        return error;
    });
}