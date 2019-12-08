'use strict';

/**
 * Generates a hosted UI login link using previously established configurations
 * 
 * @return {string} Generated link
 */
module.exports = () => {
  const {appAuthUrl, appClientId, oauthScopes, redirectUri} = GLOBAL_CONFIG.cognito;
  return `${appAuthUrl}/login?client_id=${appClientId}&response_type=code&scope=${oauthScopes.join('+')}&redirect_uri=${redirectUri}`;
};
