const api = require('express').Router();
const service = require('./index.js');

api.get('/search', async function (req, res, next) {
  try { res.json(await service.search(req.query)) } catch (e) { next(e) }
})

api.get('/get-links', async function (req, res, next) {
  try { res.json(await service.getLinks(req.query.l)) } catch (e) { next(e) }
})

api.get('/get-link', async function (req, res, next) {
  try { res.json(await service.getLink(req.query.l)) } catch (e) { next(e) }
})

module.exports = api;