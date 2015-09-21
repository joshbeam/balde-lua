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

## What's in a name?

"Lua" is the name of the scripting language, and the portuguese word for "moon". "Balde lua" means moon bucket.

<hr>

&copy; 2015 Josh Beam - MIT License
