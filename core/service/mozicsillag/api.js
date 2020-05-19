const api = require('express').Router();
const service = require('./index.js');

api.get('/search', async function (req, res, next) {
  res.json(await service.search(req.query))
})

api.get('/get-links', async function (req, res, next) {
  res.json(await service.getLinks(req.query.l))
})

module.exports = api;