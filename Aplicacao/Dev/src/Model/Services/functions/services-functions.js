const fs = require('fs')
function deg2rad(deg){
    return deg * (Math.PI/180)
  }
module.exports = {

async generatePDF(str, restaurante) { 
    let content = '<!DOCTYPE html><html><header><title>Mesas</title></header><body><div style="text-align=center"><img src="'+str+'"></div></body></html>'
    const filePath = `/home/tiago/App/Aplicacao/Dev/Model/Files/QrCode${restaurante}${Date.now()}.html`
        fs.writeFile(filePath, content, { encoding: 'utf8' }, function (err){
            if(err) {return {"message":"Erro ao gerar o PDF","result":false,"status":500}}
        })
        return {"message":"PDF gerado com sucesso","result":true,"status":200}
 },
getDistance(centerCoordinates, pointCoordinates){
        let unit = "K"
        const {latitude: lat1, longitude:lon1 } = centerCoordinates
        const {latitude: lat2, longitude:lon2 } = pointCoordinates
        let radlat1 = Math.PI * lat1/180
        let radlat2 = Math.PI * lat2/180
        let radlon1 = Math.PI * lon1/180
        let radlon2 = Math.PI * lon2/180
        let theta = lon1-lon2
        let radtheta = Math.PI * theta/180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist
},
}