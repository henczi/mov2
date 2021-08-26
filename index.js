import express from 'express';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express()
    .use('/api', require('core/api.js'))
    // serve svelte-kit app
    .listen(PORT, err => {
        if (err) console.log('error', err);
    });
