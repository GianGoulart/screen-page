module.exports.indexMdb = function (app, req, res) {
  var iframeModel = new app.src.models.iframe();
  iframeModel.getOpenRoomMDB(function (result) {
    res.render("iframe", {
      url: result
    });
  });
};

module.exports.indexSalaAula = function (app, req, res) {
  var iframeModel = new app.src.models.iframe();
  iframeModel.getOpenRoomSalaAula(function (result) {
    res.render("iframe", {
      url: result
    });
  });
};