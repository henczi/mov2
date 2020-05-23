const api = require('express').Router();
const service = require('./index.js');

api.get('/resolve', async function (req, res, next) {
  res.json(await service.doResolve(decodeURIComponent(req.query.l)))
})

module.exports = api;