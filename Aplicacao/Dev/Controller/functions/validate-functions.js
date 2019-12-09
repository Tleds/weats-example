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
exports.verificaCpf = function (cpf){
    var Soma;
    var Resto;
    Soma = 0;
    cpf = cpf.substring(0, 11);
    if (cpf == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) {return false};
    return true;
 }
exports.verificaEmail = function(email) {
usuario = email.substring(0, email.indexOf("@"));
dominio = email.substring(email.indexOf("@")+ 1, email.length);
    if ((usuario.length >=1) &&
        (dominio.length >=3) && 
        (usuario.search("@")==-1) && 
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) && 
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&      
        (dominio.indexOf(".") >=1)&& 
        (dominio.lastIndexOf(".") < dominio.length - 1)) 
        {return true}
    else{return false}
}
exports.verificaCNPJ = function(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}
exports.verificaNuloRestaurantes = function verificaNuloRestaurantes(restaurante) {
    if (restaurante.nome != "" &&
        restaurante.cnpj != "" &&
        restaurante.email != "" &&
        restaurante.telefone != "" &&
        restaurante.senha != "") {
        if (typeof restaurante.nome != "undefined" &&
            typeof restaurante.cnpj != "undefined" &&
            typeof restaurante.email != "undefined" &&
            typeof restaurante.telefone != "undefined" &&
            typeof restaurante.senha != "undefined") {
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
        mesa.descricao != "" &&
        mesa.local != "") {
        if (typeof mesa.id_restaurante != "undefined" &&
            typeof mesa.descricao != "undefined" &&
            typeof mesa.local != "undefined") {
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
exports.verificaNuloPedido = function verificaNuloPedido(pedido) {
    if (pedido.id_restaurante != "" &&
        pedido.id_mesa != "" &&
        pedido.id_usuario != "" &&
        pedido.produto != "" &&
        pedido.quantidade != "" &&
        pedido.preco_pedido != "" &&
        pedido.senha != "") {
        if (typeof pedido.id_restaurante != "undefined" &&
            typeof pedido.id_mesa != "undefined" &&
            typeof pedido.id_usuario != "undefined" &&
            typeof pedido.produto != "undefined" &&
            typeof pedido.quantidade != "undefined" &&
            typeof pedido.preco_pedido != "undefined" &&
            typeof pedido.senha != "undefined") {
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