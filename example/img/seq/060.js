var level = require('level')
var db = level('./data/ephemera.db')

var hyperlog = require('hyperlog')
var log = hyperlog(db, { valueEncoding: 'json' })

var blob = require('content-addressable-blob-store')
var store = blob('./data/ephemera.blob')

var http = require('http')
var server = http.createServer(function (req, res) {
  if (/^(POST|PUT)$/.test(req.method)) {
    req.pipe(store.createWriteStream(function (err, w) {
      var value = { hash: w.key }
      log.append(value, function (err) {
        // ...
      })
    }))
  }
  else res.end('not found')
})
server.listen(5000)
