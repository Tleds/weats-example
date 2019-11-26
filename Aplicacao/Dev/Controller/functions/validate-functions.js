exports.verificaNulofp = function verificaNulo(forma_pagamento) {
    if (forma_pagamento.descricao != "" &&
        forma_pagamento.tipo_forma_pagamento != "" &&
        forma_pagamento.bandeira != "") {
        if (typeof forma_pagamento.descricao != "undefined" &&
            typeof forma_pagamento.tipo_forma_pagamento != "undefined" &&
            typeof forma_pagamento.bandeira != "undefined") {
            return true;
        } else { return false; }
    } else {
        return false;
    }
}
exports.verificaNuloLoginRest = function verificaNuloLoginRest(login) {
    if (login.email != "" &&
        login.senha != "") {
        if (typeof login.email != "undefined" &&
            typeof login.senha != "undefined") {
            return true;
        } else { return false; }
    } else {
        return false;
    }
}
exports.verificaNuloLogin = function verificaNuloLogin(login) {
    if (login.email != "" &&
        login.senha != "") {
        if (typeof login.email != "undefined" &&
            typeof login.senha != "undefined") {
            return true;
        } else { return false; }
    } else {
        return false;
    }
}
exports.verificaNuloMenu = function verificaNuloMenu(menu) {
    if (menu.id_restaurante != "" &&
        menu.produto != "" &&
        menu.secao != "" &&
        menu.preco != "" &&
        menu.descricao_produto != "" &&
        menu.tipo_produto != "" &&
        menu.imagem_produto != "") {
        if (typeof menu.id_restaurante != "undefined" &&
            typeof menu.produto != "undefined" &&
            typeof menu.secao != "undefined" &&
            typeof menu.preco != "undefined" &&
            typeof menu.descricao_produto != "undefined" &&
            typeof menu.tipo_produto != "undefined" &&
            typeof menu.imagem_produto != "undefined") {
            return true;
        } else { return false; }
    } else {
        return false;
    }
}
exports.verificaNuloMesa = function verificaNuloMesa(mesa) {
    if (mesa.id_restaurante != "" &&
        mesa.descricao != "") {
        if (typeof mesa.id_restaurante != "undefined" &&
            typeof mesa.descricao != "undefined") {
            return true;
        } else { return false; }
    } else {
        return false;
    }
}
exports.verificaNuloPagamento = function verificaNuloPagamento(pagamento) {
    if (pagamento.id_forma_pagamento != "" &&
        pagamento.id_usuario != "" &&
        pagamento.id_restaurante != "" &&
        pagamento.id_mesa != "" &&
        pagamento.id_pedido != "" &&
        pagamento.preco_final != "") {
        if (typeof pagamento.id_forma_pagamento != "undefined" &&
            typeof pagamento.id_usuario != "undefined" &&
            typeof pagamento.id_restaurante != "undefined" &&
            typeof pagamento.id_mesa != "undefined" &&
            typeof pagamento.id_pedido != "undefined" &&
            typeof pagamento.preco_final != "undefined") {
            return true;
        } else { return false; }
    } else {
        return false;
    }
}
exportsverificaNuloPedido = function verificaNuloPedido(pedido) {
    if (pedido.id_restaurante != "" &&
        pedido.id_mesa != "" &&
        pedido.id_usuario != "" &&
        pedido.produto != "" &&
        pedido.descricao_produto != "" &&
        pedido.tipo_produto != "" &&
        pedido.quantidade != "" &&
        pedido.preco_pedido != "") {
        if (typeof pedido.id_restaurante != "undefined" &&
            typeof pedido.id_mesa != "undefined" &&
            typeof pedido.id_usuario != "undefined" &&
            typeof pedido.produto != "undefined" &&
            typeof pedido.descricao_produto != "undefined" &&
            typeof pedido.tipo_produto != "undefined" &&
            typeof pedido.quantidade != "undefined" &&
            typeof pedido.preco_pedido != "undefined") {
            return true;
        } else { return false; }
    } else {
        return false;
    }
}
exports.verificaNuloUsuario = function verificaNuloUsuario(usuario) {
    if (usuario.nome != "" &&
        usuario.email != "" &&
        usuario.telefone != "" &&
        usuario.cpf != "") {
        if (typeof usuario.nome != 'undefined' &&
            typeof usuario.email != 'undefined' &&
            typeof usuario.telefone != 'undefined' &&
            typeof usuario.cpf != 'undefined') {
            return true;
        }
    } else { return false; }
}