const api = require('express').Router();
const service = require('./index.js');

api.get('/search', async function (req, res, next) {
  try { res.json(await service.search(req.query)) } catch (e) { next(e) }
})

api.get('/get_video_info', async function (req, res, next) {
  try { res.json(await service.getVideoInfo(req.query.v)) } catch (e) { next(e) }
})

module.exports = api;