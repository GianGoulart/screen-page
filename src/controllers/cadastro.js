let ejs = require("ejs");
let path = require("path");
let nodemailer = require("nodemailer")
let moment = require("moment")
let fs = require('fs')

module.exports.index = function (app, req, res) {
    res.render("cadastro")
}

module.exports.createBanner = function (app, req, res) {   
    let content = req.body
    console.log(req.body)
    console.log("Files",req.file)
    time = content.agend.split("T")

    content.date = moment(time[0]).format("DD/MM/YYYY")
    content.time = time[1]

    fs.readFile('./data/salas.json','utf8',(err, jsonString)=>{
        if (err) {
            console.log("File read failed:", err)
            return
        }
        jsonFile = JSON.parse(jsonString)
        jsonFile.salas.mulheresdobrasil.url = content.link
        jsonFile.salas.mulheresdobrasil.image = content.image

        fs.writeFile("./data/salas.json", JSON.stringify(jsonFile), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
    })
    var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");

    fs.writeFile(`./public/${content.image}`, base64Data, 'base64', function(err) {
        console.log(err);
    });
}   