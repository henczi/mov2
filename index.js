import fs from 'fs';
import sirv from 'sirv';
import express from 'express';
import compression from 'compression';

import api from './core/api.js';

const { PORT = 3000, NODE_ENV = 'development' } = process.env;
const dev = NODE_ENV === 'development';

if (!fs.existsSync('web/build')) throw new Error('No web/build!');

express()
    .use('/api', api)
    .use(
		compression({ threshold: 0 }),
		sirv('web/build', { dev })
	)
    .listen(PORT, err => {
        if (err) console.log('error', err);
    });
