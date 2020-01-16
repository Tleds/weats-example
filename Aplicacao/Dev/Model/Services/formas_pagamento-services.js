'use-strict'
const repository_forma_pagamento = require('../Repository/formas_pagamento-repository');

module.exports = {
    async all() {
        let resposta = await repository_forma_pagamento.all();
        return resposta;
    },
    async create(forma_pagamento) {
        let resposta = await repository_forma_pagamento.create(forma_pagamento);
        return resposta;
    },
    async update(req) {
        let resposta = await repository_forma_pagamento.update(req);
        return resposta;
    },
    async delete(req) {
        let resposta = await repository_forma_pagamento.delete(req);
        return resposta
    }
}