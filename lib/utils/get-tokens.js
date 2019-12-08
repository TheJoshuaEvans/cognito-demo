'use strict';

const phin = require('phin');

/**
 * Takes a grant code and gets tokens from the cognito user pool defined in configurations
 * 
 * @param {string} code Grant code gathered from the cognito user pool hosted ui
 * 
 * @return {object} Tokens from Cognito
 */
module.exports = async (code) => {
  const {appAuthUrl, appClientId, appClientSecret, redirectUri} = GLOBAL_CONFIG.cognito;

  // Get a cognito token
  const opts = {
    url: `${appAuthUrl}/oauth2/token`,
    method: 'POST',
    form: {
      grant_type: 'authorization_code',
      code,
      client_id: appClientId,
      redirect_uri: redirectUri
    },
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${appClientId}:${appClientSecret}`).toString('base64')
    }
  };
  let tokens = (await phin(opts)).body.toString();
  try {
    tokens = JSON.parse(tokens);
  } catch (e) {
    // The token couldn't be parsed because it's not proper json. What is it?
    console.error(tokens);
    throw e;
  }

  return tokens;
};
