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

var hashMaps = lua.join('ids', 'thing');

/**
 * This will return the hashes thing:1, thing:2, and thing:3
 */
console.log(hashMaps);

client.quit();