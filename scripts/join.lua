-- gets hashes by a foreign key list

local limit = KEYS[3] or 0
local ids = redis.call('lrange', KEYS[1], 0, limit - 1)
local len = #ids

local hashes = {}

for i=1,len do
  local key = KEYS[2] .. ':' .. ids[i]
  local hash = redis.call('hgetall', key)
  local last = table.getn(hash) + 1

  hash[last] = '_key'
  hash[last+1] = key
  hashes[i] = hash
end

return hashes
