var blob = require('content-addressable-blob-store')
var store = blob('./data/ephemera.blob')
var tblob = require('torrent-blob-store')
var tstore = tblob({ trackers: [ 'udp://localhost:9000' ] })

var http = require('http')
var hyperlog = require('hyperlog')
var through = require('through2')

var level = require('level')
var db = level('./data/ephemera.db')
var log = hyperlog(db, { valueEncoding: 'json' })

var server = http.createServer(function (req, res) {
  if (req.url === '/') {
    log.createReadStream().pipe(through.obj(function (row, enc, next) {
      this.push('<div>'
        + '<a href="/blob/' + row.value.hash + '">' + row.value.hash + '</a>'
        + ' [<a href="' + row.value.magnet + '">magnet</a>]'
        + '</div>\n'
      )
      next()
    })).pipe(res)
  }
  else if (/^(POST|PUT)$/.test(req.method)) {
    var pending = 2
    var value = {}
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
  }
  else if (/^\/blob\//.test(req.url)) {
    var key = req.url.split('/')[2]
    var r = store.createReadStream(key)
    r.on('error', function (err) { res.end(err + '\n') })
    r.pipe(res)
  }
  else res.end('not found')
})
server.listen(5000)

var wsock = require('websocket-stream')
wsock.createServer({ server: server }, function (stream) {
  stream.pipe(log.replicate()).pipe(stream)
})
