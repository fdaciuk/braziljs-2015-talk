var kp = require('bittorrent-dht-store-keypair')()
console.log(kp.id)
var dht = new(require('bittorrent-dht'))({ bootstrap: false })
dht.listen(5001)
