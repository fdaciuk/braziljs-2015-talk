var kp = require('bittorrent-dht-store-keypair')()
console.log(kp.id)
var dht = new(require('bittorrent-dht'))({ bootstrap: false })
dht.listen(5001)

var prev = 'null'
updateHash(prev)

function updateHash (hash) {
  var hex = hash.toString('hex')
  dht.put(kp.store(hex), function onput(errors, hash) {
    errors.forEach(console.error)
  })
}
