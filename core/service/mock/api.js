const api = require('express').Router();
const service = require('./index.js');

api.get('/search', async function (req, res, next) {
  try { res.json(await service.search(req.query.search, req.query.page)) } catch (e) { next(e) }
})

module.exports = api;