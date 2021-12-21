const ApiError = require('./error/api-error.js');

const api = require('express').Router();

api.use('/url-resolver', require('./service/urlresolver/api.js'));

api.use('/mock', require('./service/mock/api.js'));
api.use('/inda', require('./service/inda/api.js'));
api.use('/videa', require('./service/videa/api.js'));

api.use('/mozicsillag', require('./service/mozicsillag/api.js'));

// API - not found
api.use(function (req, res, next) {
	res.status(404).json({ error: { code: 404, msg: '404 - Not found!' } });
});

// API - error
api.use(function (err, req, res, next) {
	console.error(err.stack);
  if (err instanceof ApiError) {
    res.status(500).json({ error: { code: 500, msg: err.message } })
  } else {
    res.status(500).json({ error: { code: 500, msg: 'Something went wrong :(' } });
  }
});

module.exports = api;