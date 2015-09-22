var lua = require('./index.js');
var redis = require('redis');
var client = redis.createClient();

lua.init(client);

/**
 * This example requires that there exists an "ids" list of `1, 2, 3`
 * and 3 hashmaps --
 *
 * things:1
 * things:2
 * things:3
 */

lua.join(['ids', 'things', 2], function(err, res) {
  /**
   * This will return the hashes things:3, and things:2
   */
  console.log(res);
  client.quit();
});