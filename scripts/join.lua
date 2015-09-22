local a = KEYS[3] or 1;
local ids = redis.call('lrange', KEYS[1], 0, -1)
local len = table.getn(ids)

local hashes = {}

for i=1,3 do
  local key = KEYS[2] .. ':' .. ids[i]
  local hash = redis.call('hgetall', key)
  local last = table.getn(hash) + 1

  hash[last] = '_key'
  hash[last+1] = key
  hashes[i] = hash
end

return hashes
