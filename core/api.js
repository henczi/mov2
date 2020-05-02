const fetch = require('node-fetch');
const inda = require('./service/inda');
const videa = require('./service/videa');

const mock = require('./service/mock');

module.exports = function(app) {
  app.get('/api/mock/search', async function (req, res, next) {
    res.json(await mock.search(req.query.search, req.query.page))
  })

  app.get('/api/inda/search', async function (req, res, next) {
    res.json(await inda.search(req.query))
  })

  app.get('/api/inda/redirect', async function (req, res, next) {
    res.redirect(await fetch(req.query.l).then(x => x.text()).then(x => x.match(/\/\/embed.indavideo.hu\/player\/video\/[a-f0-9]*\//)[0]))
  })
  
  app.get('/api/videa/search', async function (req, res, next) {
    res.json(await videa.search(req.query.search, req.query.page))
  })

  return app;
}