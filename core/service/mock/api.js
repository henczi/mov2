const api = require('express').Router();
const service = require('./index.js');

api.get('/search', async function (req, res, next) {
  res.json(await service.search(req.query.search, req.query.page))
})

module.exports = api;