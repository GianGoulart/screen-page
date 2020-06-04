var express = require('express')
var consign = require('consign')
var bodyParser = require('body-parser')
var multer = require('multer')
const upload = multer({dest: __dirname + '/public'});

var app = express();
app.set('view engine', 'ejs')
app.set('views', './src/views')


app.use(bodyParser.urlencoded({extended:true}))
app.use( express.static( "public" ) );

consign()
 .include('src/routes')
 .include('src/models')
 .include('src/controllers')
 .into(app)

app.listen(process.env.PORT || 3000, function (){
    console.log("Listening from port 3000")
})