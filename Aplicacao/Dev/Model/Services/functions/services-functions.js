const fs = require('fs');
exports.GerarPdf = function Pdf(dados) { 
    dados = 'www.google.com';
        let content = '<!DOCTYPE html><html><header><title>Mesas</title></header><body><div style="text-align=center"><img src="'+dados+'"></div></body></html>';
            return fs.writeFile('./Model/Repository/Files/qr.html', content, { encoding: 'utf8' }, function (err){
                if(err) return {"result":false};
            })
 }