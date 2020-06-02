let ejs = require("ejs");
let path = require("path");
let nodemailer = require("nodemailer")
let moment = require("moment")

module.exports.index = function (app, req, res) {
    res.render("cadastro")
}

module.exports.createBanner = function (app, req, res) {   
    let content = req.body
    time = content.agend.split("T")

    content.date = moment(time[0]).format("DD/MM/YYYY")
    content.time = time[1]

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
                    path: './public/live0206.jpeg',
                    cid: 'unique@kreata.ee' //same cid value as in the html img src
                }],
                from: content.emails,
                to: req.body.guests,
                subject: req.body.meetingName,
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