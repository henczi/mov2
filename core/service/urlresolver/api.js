const api = require('express').Router();
const service = require('./index.js');

api.get('/resolve', async function (req, res, next) {
  try {
    res.json(await service.doResolve(decodeURIComponent(req.query.l)))
  } catch (err) {
    next(err)
  }
})

module.exports = api;