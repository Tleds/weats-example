const fs = require('fs');
const filePath = "/home/tiago/App/Aplicacao/Dev/Model/Files/qr.html";

exports.GerarPdf = function Pdf(dados) { 
        let content = '<!DOCTYPE html><html><header><title>Mesas</title></header><body><div style="text-align=center"><img src="'+dados+'"></div></body></html>';
            return fs.writeFile(filePath, content, { encoding: 'utf8' }, function (err){
                if(err) return {"result":false};
            })
 }
 