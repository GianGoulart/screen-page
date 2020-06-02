module.exports = function (app) {
    app.get('/screen/mdb', function (req, res) {
        app.src.controllers.iframe.indexMdb(app, req, res)
    })

    app.get('/screen/sala-de-aula', function (req, res) {
        app.src.controllers.iframe.indexSalaAula(app, req, res)
    })

    app.get('/cadastrar', function (req, res) {
        app.src.controllers.cadastro.index(app, req, res)
    })
    app.get('/', function (req, res) {
        app.src.controllers.cadastro.index(app, req, res)
    })

    app.post('/createBanner', function (req, res) {
        app.src.controllers.cadastro.createBanner(app, req, res)
    })

}