import preprocess from 'svelte-preprocess';

import api from '../core/api.js';

const apiMiddlewarePlugin = {
	name: 'apiMiddlewarePlugin',
	configureServer(server) {
		server.middlewares.use('/api', (req, res, next) => {
			req.query = req.url.split('?')?.[1]?.split('&').reduce((a, x) => (a[x.split('=')[0]] = x.split('=')[1], a), {});
			res.json = function(obj) { this.end(JSON.stringify(obj)); };
			next();
		});
		server.middlewares.use('/api', api);
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			plugins: [apiMiddlewarePlugin]
		}
	}
};

export default config;