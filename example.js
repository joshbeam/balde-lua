var lua = require('./index.js');
var redis = require('redis');
var client = redis.createClient();

lua.init(client);

/**
 * This example requires that there exists an "ids" list of `1, 2, 3`
 * and 3 hashmaps --
 *
 * thing:1
 * thing:2
 * thing:3
 */

lua.join(['ids', 'thing', 2], function(err, res) {
  /**
   * This will return the hashes thing:3, and thing:2
   */
  console.log(res);
  client.quit();
});