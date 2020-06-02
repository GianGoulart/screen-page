let ejs = require("ejs");
let path = require("path");
let nodemailer = require("nodemailer")
let moment = require("moment")
let fs = require('fs')
let multer = require('multer')

let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads')
    },
    filename: function(req, file, callback) {
        console.log(file)
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
   
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
    let upload = multer({
        storage: storage,
        fileFilter: function(req, file, callback) {
            let ext = path.extname(file.originalname)
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(res.end('Only images are allowed'), null)
            }
            callback(null, true)
        }
    }).single('userFile');
    upload(req, res, function(err) {
        console.log(err)
        res.end('File is uploaded')
    })
}   