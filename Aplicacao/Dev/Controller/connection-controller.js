const cp = require('../Model/Repository/criptografia');
const restaurante = require('./restaurantes-controller');
const menus = require('./menus-controller')

exports.post = (req, res, next) => {
    var qr = req.headers['c-code-qr'];
    if (!qr) return res.status(401).send({ auth: false, message: 'No QR Code provided.' });
    let dados = cp.dcp(qr);
    dados = JSON.parse(dados);
    req.headers.id_restaurante = dados.restaurante;
    req.headers.tipo = dados.tipo;
    req.headers.local = dados.local;
    req.headers.id_mesa = dados.mesa;
    if(dados.local == 0){
        menus.get(req,res,next);
    }
    if(dados.local != 0){
        restaurante.getShopping(req,res,next);
        //res.redirect(303,'/connection_restaurante');
    }
    
}