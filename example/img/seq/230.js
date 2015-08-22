var blob = require('content-addressable-blob-store')
var store = blob('./data/ephemera.blob')
var tblob = require('torrent-blob-store')
var tstore = tblob({ trackers: [ 'udp://localhost:9000' ] })

// ...

var server = http.createServer(function (req, res) {
  // ...
  else if (/^(POST|PUT)$/.test(req.method)) {
    var pending = 2, value = {}
    req.pipe(store.createWriteStream(function (err, w) {
      value.hash = w.key; done()
    }))
    req.pipe(tstore.createWriteStream(function (err, w) {
      value.magnet = w.key; done()
    }))
    function done (err, w) {
      if (--pending !== 0) return
      log.append(value, function (err) {
        res.end(JSON.stringify(value, null, 2) + '\n')
      })
    }
  // ...
})
server.listen(5000)

// ...
