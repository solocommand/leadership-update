const {
  cleanEnv,
  makeValidator,
  url,
} = require('envalid');

const nonemptystr = makeValidator((v) => {
  const err = new Error('Expected a non-empty string');
  if (v === undefined || v === null || v === '') {
    throw err;
  }
  const trimmed = String(v).trim();
  if (!trimmed) throw err;
  return trimmed;
});

module.exports = cleanEnv(process.env, {
  TENANT_KEY: nonemptystr({ desc: 'The tenant key. Is used for querying the account information and settings from the core database connection.' }),
  GRAPHQL_URI: url({ desc: 'The GraphQL URL to connect to.' }),
});
