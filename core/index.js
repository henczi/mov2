var express = require('express');
var bodyParser = require('body-parser');

const PORT = 3000;

const inda = require('./service/inda');
const videa = require('./service/videa');

var app = express();

app.set('json spaces', 2)

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({	extended: true }));

app.get('/api/inda/search', async function (req, res, next) {
	res.json(await inda.search(req.query))
})

app.get('/api/videa/search', async function (req, res, next) {
	res.json(await videa.search(req.query.search, req.query.page))
})

// Error handling -- 404
app.use(function (req, res, next) {
	res.status(404).json({ error: { code: 404, msg: '404 - Not found!' } });
});

// Error handling -- 500
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).json({ error: { code: 500, msg: '500 - Internal server error!' } });
});

// start
app.listen(PORT, function () {
	console.log(`[*] App started, listening on port ${PORT}`);
});