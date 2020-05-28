const fs = require('fs');
const fileName = require('../../data/salas.json');
const file = fileName;

function cadastro() {}

cadastro.prototype.addRoom = function(callback){
    file["key"] = "https://www.google.com";

    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(file));
    console.log('writing to ' + fileName);
    });    
    callback("Cadastrado com sucesso!")
}

module.exports = function(){
    return cadastro;
}