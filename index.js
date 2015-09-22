var fs = require('fs');
var client;

module.exports = {
  join: join,
  init: init
};

function init(_client) {
  client = _client;
}

/**
 *  @param args {Array} name of key table, namespace of hashes, and an optional limit
 *  @param callback {Function} called after the script executes
 */
function join(args, callback) {
  var numKeys = ''+args.length;
  var keys = args[0];
  var hashNamespace = args[1];
  var limit = args[2];

  if(typeof callback !== 'function') {
    throw new TypeError('moon-bucket requires a callback as the last argument');
  }

  if(client) {
    fs.readFile('./scripts/join.lua', 'utf8', function(err, script) {
      client.eval([script, numKeys, keys, hashNamespace, limit], function(err, res) {
        var reply;

        if(res) {
          reply = res.map(function(item) {
            return reply_to_object(item);
          });
        }

        return callback(err, reply);
      });
    });
  }
}

/**
 *  Taken from the node redis source.
 *
 *  Converts a redis reply to a valid JavaScript object.
 */
function reply_to_object(reply) {
    var obj = {}, j, jl, key, val;

    if (reply.length === 0 || !Array.isArray(reply)) {
        return null;
    }

    for (j = 0, jl = reply.length; j < jl; j += 2) {
        key = reply[j].toString('binary');
        val = reply[j + 1];
        obj[key] = val;
    }

    return obj;
}
