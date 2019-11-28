const fs = require('fs');
const filePath = "/home/tiago/App/Aplicacao/Dev/Model/Files/qr.html";

exports.GerarPdf = function Pdf(dados) { 
        let content = '<!DOCTYPE html><html><header><title>Mesas</title></header><body><div style="text-align=center"><img src="'+dados+'"></div></body></html>';
            return fs.writeFile(filePath, content, { encoding: 'utf8' }, function (err){
                if(err) return {"result":false};
            })
 }
 exports.validaCpf = function (cpf){
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