'use strict';

module.exports = {
  /**
   * AWS global configurations
   */
  aws: {
    /**
     * Your AWS access key id. This should remain null on EC2 instances. Use roles to handle permissions on EC2
     */
    accessKeyId: null,

    /**
     * Your AWS access key secret. This should remain null on EC2 instances. Use roles to handle permissions on EC2
     */
    secretAccessKey: null,

    /**
     * Default region
     */
    region: 'us-west-2'
  },

  /**
   * Configurations for AWS Cognito User Pools and Identity Pools
   */
  cognito: {
    /**
     * User Pool Id
     */
    userPoolId: null,

    /**
     * Identity Pool Id
     */
    identityPoolId: null,

    /**
     * App Client Id for the User Pool
     */
    appClientId: null,

    /**
     * App Client Secret for the user pool
     */
    appClientSecret: null,

    /**
     * App Client authentication url
     */
    appAuthUrl: null,

    /**
     * Region to run cognito functions in. Overrides default when defined
     */
    region: undefined,

    /**
     * OAuth scopes the app client can access
     */
    oauthScopes: [
      'openid'
    ],

    /**
     * App client redirect URI
     */
    redirectUri: 'http://localhost:3000/login'
  },

  server: {
    /**
     * Port to run the server at
     */
    port: 3000,

    /**
     * Keys used to sign cookies
     */
    keys: []
  }
}
