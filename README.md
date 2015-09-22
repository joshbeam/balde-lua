# :honey_pot: moon-bucket :last_quarter_moon_with_face:

A bucket of <a href="https://www.redisgreen.net/blog/intro-to-lua-for-redis-programmers/">Lua scripts for Redis</a>.

## Usage

Shell:

```bash
redis-cli eval "$(cat scripts/join.lua)" [args]
```

<a href="https://github.com/NodeRedis/node_redis">node-redis</a>

```javascript
var lua = require('moon-bucket');
var redis = require('redis');
var client = redis.createClient();

lua.init(client);

var hashMaps = lua.join('ids', 'things');
```

## Docs

`join`

Redis doesn't have joins. However, we can script them with Lua.

This script lets us get hashes by their id.

Prereqs: our hashes must be namespaced `namespace:*`, where `namespace` is our namespace (for example, `cars`), and `*` is an inremental id (which resides in a foreign list of ids, such as `1 2 3 4 5` etc.)

Shell:

```
# redis-cli eval "$(cat scripts/join.lua)" [2|3] [foreign-key] [namespace] [optional limit]

redis-cli eval "$(cat scripts/join.lua)" 3 ids things 5
```

JavaScript:

```
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

var hashMaps = lua.join('ids', 'things');

/**
 * This will return the hashes things:1, things:2, and things:3
 */
console.log(hashMaps);
```

This will return hashes `things:*`, where each `things:*` has an ID from the list of `ids` with a limit of `5`.

This would return 5 of our hashes, looking like this (maybe JSON, if we're using node.js):

```
{
  "hello": "world",
  "some_other": "property",
  "_key": "things:1"
}
```

As you can see, a property called `_key` gets automatically embedded into the hash when it is returned to us so we know to which key this object belongs.

Just want to get all of the hashes?

```
redis-cli eval "$(cat scripts/join.lua)" 2 ids things
```

By default, our limit is `-1`, which is the last item in the list.

## What's in a name?

"Lua" is the name of the scripting language, and the portuguese word for "moon". "Balde lua" means moon bucket.

<hr>

&copy; 2015 Josh Beam - MIT License | www.joshbe.am | talk@joshbe.am
