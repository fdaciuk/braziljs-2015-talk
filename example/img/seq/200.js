var blob = require('content-addressable-blob-store')
var store = blob('./data/ephemera.blob')

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
        + '</div>\n'
      )
      next()
    })).pipe(res)
  }
  else if (/^(POST|PUT)$/.test(req.method)) {
    req.pipe(store.createWriteStream(function (err, w) {
      var value = { hash: w.key }
      log.append(value, function (err) {
        res.end(JSON.stringify(value, null, 2) + '\n')
      })
    }))
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
