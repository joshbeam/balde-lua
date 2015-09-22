var sh = require('child_process');
var fs = require('fs');
var redis = require('redis');
var client;

module.exports = {
  join: join,
  init: init
};

function init(_client) {
  client = _client;
}

function join(keys, hashNamespace, limit) {
  var numKeys = ''+arguments.length;
  var script = fs.readFileSync('./scripts/join.lua', 'utf8');

  if(client) {
    client.eval([script, numKeys, keys, hashNamespace, limit], function(err, res) {
      if(err) {
        return console.log('moon-bucket join error:', err);
      }

      var reply = res.map(function(item) {
        return reply_to_object(item);
      });

      console.log('moon-bucket join success:', reply);
    });
  }
}

// taken from node redis source code
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
