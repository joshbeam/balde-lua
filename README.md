# balde-lua

A bucket of <a href="https://www.redisgreen.net/blog/intro-to-lua-for-redis-programmers/">Lua scripts for Redis</a>.

## Usage

Shell:

```bash
redis-cli eval "$(cat one-of-the-scripts.lua)" [args]
```

<a href="https://github.com/NodeRedis/node_redis">node-redis</a>

```javascript
client.eval(['cat one-of-the-scripts.lua', [...args]], [callback]);
```

## Docs

`join`

Redis doesn't have joins. However, we can script them with Lua.

This script lets us get hashes by their id.

Prereqs: our hashes must be namespaced `namespace:*`, where `namespace` is our namespace (for example, `cars`), and `*` is an inremental id (which resides in a foreign list of ids, such as `1 2 3 4 5` etc.)

```
# redis-cli eval "$(cat scripts/join.lua)" [2|3] [foreign-key] [namespace] [optional limit]

redis-cli eval "$(cat scripts/join.lua)" 3 ids things 5
```

This will return hashes `things:*`, where each `things:*` has an ID from the list of `ids` with a limit of `5`.

Just want to get all of the hashes?

```
redis-cli eval "$(cat scripts/join.lua)" 2 ids things
```

By default, our limit is `-1`, which is the last item in the list.

## What's in a name?

"Lua" is the name of the scripting language, and the portuguese word for "moon". "Balde lua" means moon bucket.

<hr>

&copy; 2015 Josh Beam - MIT License | www.joshbe.am | talk@joshbe.am
