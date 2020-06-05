module.exports.indexMdb = function (app, req, res) {
    var iframeModel= new app.src.models.iframe()
    iframeModel.getOpenRoomMDB(function(result) {
        console.log(result)
        res.render("iframe", {url: result})
    })
}

module.exports.indexSalaAula = function (app, req, res) {
    var iframeModel= new app.src.models.iframe()

    iframeModel.getOpenRoomSalaAula(function(result) {
        res.render("iframe", {url: result})
    })
}

module.exports.indexDiversos = function (app, req, res) {
    var iframeModel= new app.src.models.iframe()

    iframeModel.getOpenRoomDiversos(function(result) {
        res.render("iframe", {url: result})
    })
}
