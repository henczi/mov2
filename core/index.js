var express = require('express');
var bodyParser = require('body-parser');

const PORT = 3000;

var app = express();

app.set('json spaces', 2)

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({	extended: true }));

require('./api')(app);

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