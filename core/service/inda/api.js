const api = require('express').Router();
const fetch = require('node-fetch');
const service = require('./index.js');

api.get('/search', async function (req, res, next) {
  try { res.json(await service.search(req.query)) } catch (e) { next(e) }
})

api.get('/get_video_info', async function (req, res, next) {
  try { res.json(await service.getVideoInfo(req.query.v)) } catch (e) { next(e) }
})

api.get('/redirect', async function (req, res, next) {
  try { res.redirect(await fetch(req.query.l).then(x => x.text()).then(x => x.match(/\/\/embed.indavideo.hu\/player\/video\/[a-f0-9]*\//)[0])) } catch (e) { next(e) }
})

module.exports = api;