'use-strict'

const services_pagamentos = require('../Model/Services/pagamentos-services')

exports.get = (req, res, next) => {
    services_pagamentos.all().then(result => {
        res.json(result); //retorna o json com os pagamentos
    });
}
exports.post = (req, res, next) => {
    let pagamento = req.body;
    if (pagamento.id_forma_pagamento != "" &&
        pagamento.id_usuario != "" &&
        pagamento.id_restaurante != "" &&
        pagamento.id_mesa != "" &&
        pagamento.id_pedido != "" &&
        pagamento.preco_final != "") {
        console.log(pagamento);
        services_pagamentos.create(pagamento).then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                res.status(404).json(error);
            })
            //Aqui entra a integração com a API de pagamento.
    } else {
        res.status(500).json({ "message": "Não é permitido nulo" })
    }
}
exports.put = (req, res, next) => { //request, responde e next
    if (req.params.id != "") { //verificando o parâmetro da requisição
        if (pagamento.id_forma_pagamento != "" &&
            pagamento.id_usuario != "" &&
            pagamento.id_restaurante != "" &&
            pagamento.id_mesa != "" &&
            pagamento.id_pedido != "" &&
            pagamento.preco_final != "") {
            services_pagamentos.put(req).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(404).json(error);
            });
        } else {
            res.status(500).json({ "message": "Não é permitido nulo" })
        }
        //Aqui entra a integração com a API de pagamento.
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}
exports.delete = (req, res, next) => { //request, responde e next   
    if (req.params.ident != "") { //verificando o parâmetro da requisição
        services_pagamentos.delete(req).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(404).json(error);
        });
    } else {
        res.status(404).json({ "message": "Identificador inválido" });
    }
}