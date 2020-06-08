let ejs = require("ejs");
let path = require("path");
let nodemailer = require("nodemailer")
let moment = require("moment")
let fs = require("fs")

module.exports.index = function (app, req, res) {
    res.render("cadastro")
}

module.exports.createBanner = function (app, req, res) {   
    let content = req.body
    let filename 
    if(req.file) {
        console.log("File:", req.file)
    }
    time = content.agend.split("T")

    content.date = moment(time[0]).format("DD/MM/YYYY")
    content.time = time[1]

    fs.readFile('./data/salas.json','utf8',(err, jsonString)=>{
        if (err) {
            console.log("File read failed:", err)
            return
        }
        jsonFile = JSON.parse(jsonString)

        switch (content.project) {
            case "Mulheres do Brasil":
                jsonFile.salas.mulheresdobrasil.url = content.link
                break;
            case "Sala de aula":
                jsonFile.salas.saladeaula.url = content.link
                break;
            case "Diversos":
                jsonFile.salas.diversos.url = content.link
                break;                    
            default:
                break;
        }
    
    
        fs.writeFile("./data/salas.json", JSON.stringify(jsonFile), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

    })
    if (req.file){
        filename = req.file 
    }else{
        filename=""
    } 

    switch (content.project) {
        case "Mulheres do Brasil":
            content.url="https://screen-page.herokuapp.com/screen/mdb"
            content.image = filename
            break;
        case "Sala de aula":
            content.url="https://screen-page.herokuapp.com/screen/sala-de-aula"
            content.image = filename            
            break;
        case "Diversos":
            content.url="https://screen-page.herokuapp.com/screen/diversos"
            content.image= filename
            break;                    
        default:
            break;
    }

    this.sendEmail(content, res)
}   

module.exports.sendEmail = function (content, res) {
    ejs.renderFile(path.join(__dirname, '../views/', "banner.ejs"), {content: content}, (err, data) => {        
        if (err) {
            console.log(err);
        } else {
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: content.email,
                pass: content.passEmail
            }});

            var mailOptions = {
                attachments: [{
                    filename: 'headermdb.png',
                    path: `./public/images/${content.image}`,
                    cid: 'unique@kreata.ee' //same cid value as in the html img src
                }],
                from: content.emails,
                to: content.guests,
                subject: content.meetingName,
                html: data
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)
                res.render("erro.ejs")
                return
            } else {
                res.render("sucesso.ejs")
               return
            }});
            
        }
    });
}