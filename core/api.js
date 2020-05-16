const api = require('express').Router();

api.use('/mock', require('./service/mock/api.js'));
api.use('/inda', require('./service/inda/api.js'));
api.use('/videa', require('./service/videa/api.js'))

module.exports = api;