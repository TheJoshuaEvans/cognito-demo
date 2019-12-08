'use strict';

const CognitoIdentity = require('aws-sdk/clients/cognitoidentity');
const cognitoIdentity = new CognitoIdentity({
  accessKeyId: GLOBAL_CONFIG.aws.accessKeyId,           // On EC2 this would be handled by a role
  secretAccessKey: GLOBAL_CONFIG.aws.secretAccessKey,   // On EC2 this would be handled by a role
  region: GLOBAL_CONFIG.aws.region
});

/**
 * Takes an ID Token gathered using the `get-token` utility method, and uses established configurations to exchange
 * that token for AWS credentials using Cognito Identity Pools
 * 
 * @param {string} idToken The previously gathered id token
 * 
 * @return {object} The full credentials object from Cognito
 */
module.exports = async (idToken) => {
  const {identityPoolId, userPoolId} = GLOBAL_CONFIG.cognito;
  const region = GLOBAL_CONFIG.cognito && GLOBAL_CONFIG.cognito.region ? GLOBAL_CONFIG.cognito.region : GLOBAL_CONFIG.aws.region;

  // Get an identity id
  const Logins = {};
  Logins[`cognito-idp.${region}.amazonaws.com/${userPoolId}`] = idToken;
  const { IdentityId } = await new Promise((resolve, reject) => {
    cognitoIdentity.getId({ 
      IdentityPoolId: `${region}:${identityPoolId}`,
      Logins
    }, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });

  // Get credentials
  const credentials = await new Promise((resolve, reject) => {
    cognitoIdentity.getCredentialsForIdentity({ 
      IdentityId,
      Logins
    }, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });

  return credentials;
};
