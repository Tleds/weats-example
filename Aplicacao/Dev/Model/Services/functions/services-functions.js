const fs = require('fs');


exports.GerarPdf = function Pdf(str, restaurante) { 
        let content = '<!DOCTYPE html><html><header><title>Mesas</title></header><body><div style="text-align=center"><img src="'+str+'"></div></body></html>';
        const filePath = `/home/tiago/App/Aplicacao/Dev/Model/Files/QrCode${restaurante}${Date.now()}.html`;
            fs.writeFile(filePath, content, { encoding: 'utf8' }, function (err){
                if(err) {return {"result":false};}
            })
            return {"result":true};
 }
 