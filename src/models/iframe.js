var fs = require('fs')

function iframe() {}

iframe.prototype.getOpenRoomMDB = function(callback){
    fs.readFile('./data/salas.json', 'utf8', function (err, result) {
        var sala = JSON.parse(result)
        console.log(sala)
        callback(sala.salas.mulheresdobrasil.url)

    })
}

iframe.prototype.getOpenRoomSalaAula = function(callback){
    fs.readFile('./data/salas.json', 'utf8', function (err, result) {
        var sala = JSON.parse(result)
        callback(sala.salas.saladeaula.url)
    })
}


iframe.prototype.getOpenRoomDiversos = function(callback){
    fs.readFile('./data/salas.json', 'utf8', function (err, result) {
        var sala = JSON.parse(result)
        callback(sala.salas.diversos.url)
    })
}

module.exports = function(){
    return iframe;
}