const fs = require('fs');
function deg2rad(deg){
    return deg * (Math.PI/180);
  }

exports.GerarPdf = function Pdf(str, restaurante) { 
    let content = '<!DOCTYPE html><html><header><title>Mesas</title></header><body><div style="text-align=center"><img src="'+str+'"></div></body></html>';
    const filePath = `/home/tiago/App/Aplicacao/Dev/Model/Files/QrCode${restaurante}${Date.now()}.html`;
        fs.writeFile(filePath, content, { encoding: 'utf8' }, function (err){
            if(err) {return {"result":false};}
        })
        return {"result":true};
 }
 
exports.getDistance = function getDistanceFromLatLonInKm(centerCoordinates, pointCoordinates){
        let unit = "K";
        const {Lat: lat1, Long:lon1 } = centerCoordinates;
        const {latitude: lat2, longitude:lon2 } = pointCoordinates;

        let radlat1 = Math.PI * lat1/180
        let radlat2 = Math.PI * lat2/180
        let radlon1 = Math.PI * lon1/180
        let radlon2 = Math.PI * lon2/180
        let theta = lon1-lon2
        let radtheta = Math.PI * theta/180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist
    // const radius = 6371;


    // const {latitude: lat1, longitude:lon1 } = centerCoordinates;
    // const {latitude: lat2, longitude:lon2 } = pointCoordinates;
    


    // const dLat = deg2rad(lat2-lat1);
    // const dLon = deg2rad(lon2-lon1);

    // const a = 
    // Math.sin(dLat/2) * Math.sin(dLat/2) *
    // Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    // Math.sin(dLon/2) * Math.sin(dLon/2);

    // const center = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    // const distance = radius * center;

    // return distance;
}