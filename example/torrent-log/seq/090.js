// ...

function post (value, cb) {
  value = Buffer.concat([
    Buffer(prev.toString('hex') + '\n'),
    value
  ])
  dht.put({ v: value }, function (errors, hash) {
    errors.forEach(console.error)
    prev = hash
    console.log(hash.toString('hex'))
    updateHash(hash)
    cb(null, hash)
  })
}

// ...
