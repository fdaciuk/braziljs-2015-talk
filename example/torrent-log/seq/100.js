var kp = require('bittorrent-dht-store-keypair')()
console.log(kp.id)
var dht = new(require('bittorrent-dht'))({ bootstrap: false })
dht.listen(5001)

var prev = 'null'
updateHash(prev)

var http = require('http')
var concat = require('concat-stream')
var server = http.createServer(function (req, res) {
  if (/^(POST|PUT)$/.test(req.method)) {
    req.pipe(concat(function (body) {
      post(body, function (err, hash) {
        res.end(hash.toString('hex') + '\n')
      })
    }))
  }
  else res.end('not found\n')
})
server.listen(5000)

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

function updateHash (hash) {
  var hex = hash.toString('hex')
  dht.put(kp.store(hex), function onput(errors, hash) {
    errors.forEach(console.error)
  })
}
