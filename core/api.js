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
  
  app.get('/api/videa/search', async function (req, res, next) {
    res.json(await videa.search(req.query.search, req.query.page))
  })

  return app;
}