const api = require('express').Router();
const service = require('./index.js');

api.get('/search', async function (req, res, next) {
  res.json(await service.search(req.query.search, req.query.page))
})

api.get('/get_video_info', async function (req, res, next) {
  res.json(await service.getVideoInfo(req.query.v))
})

module.exports = api;