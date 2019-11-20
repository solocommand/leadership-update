const express = require('express');
const { TENANT_KEY, GRAPHQL_URI } = require('./env');

const { log } = console;
const app = express();

app.get('/config.json', (_, res) => res.json({ TENANT_KEY, GRAPHQL_URI }));
app.listen(80, () => log('config-server started!'));
