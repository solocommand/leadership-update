const express = require('express');
const { TENANT_KEY, GRAPHQL_URI, NODE_ENV } = require('./env');

const { log } = console;
const app = express();

app.get('/config.json', (_, res) => res.json({ TENANT_KEY, GRAPHQL_URI }));
app.get('/config.js', (_, res) => {
  const config = {
    modulePrefix: 'portal',
    environment: NODE_ENV,
    rootURL: '/',
    locationType: 'auto',
    apollo: { apiURL: GRAPHQL_URI },
    EmberENV: { FEATURES: {}, EXTEND_PROTOTYPES: {} },
    APP: { TENANT_KEY },
  };
  res.send(`
    (function(document) {
      var meta = document.createElement('meta');
      meta.setAttribute('name', 'portal/config/environment')
      meta.setAttribute('content', '${JSON.stringify(config)}');
      document.getElementsByTagName('head')[0].appendChild(meta);
    })(document);
  `);
});
app.listen(80, () => log('config-server started!'));
