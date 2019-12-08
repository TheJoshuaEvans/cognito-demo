'use strict';

const merge = require('lodash.merge');

const cognitoDemoConfig = require('../../.cognitodemorc.default.js');

/**
 * Class handles initialization of configurations
 * 
 * Configurations are gathered from the following sources, with later sources overriding previous sources
 * 1. The .cognitodemorc.default.js file
 * 2. The ignored .cognitodemorc.js file
 * 3. An object passed to the class constructor
 */
class Config {
  /**
   * Constructor takes an optional configuration object to override configurations. Otherwise configurations are
   * gathered from other sources
   * 
   * @param {*} [configObject] Optional configuration object 
   */
  constructor(configObject = {}) {
    let secretConfig = {};
    try {
      secretConfig = require('../../.cognitodemorc.js');
    } catch (e) {
      console.log(e);
      // No secret config
    }

    merge(this, cognitoDemoConfig, secretConfig, configObject);
  }
}

module.exports = Config;
