var blob = require('content-addressable-blob-store')
var store = blob('/tmp/ephemera.blob')

var http = require('http')
var hyperlog = require('hyperlog')
var through = require('through2')

var level = require('level')
var db = level('/tmp/ephemera.db')
var log = hyperlog(db)

var server = http.createServer(function (req, res) {
  if (req.url === '/') {
    log.createReadStream().pipe(through.obj(function (row, enc, next) {
      this.push('<div>'
        + '<a href="/blob/' + row.value + '">' + row.value + '</a>'
        + '</div>\n'
      )
      next()
    })).pipe(res)
  }
  else if (/^(POST|PUT)$/.test(req.method)) {
    req.pipe(store.createWriteStream(function (err, w) {
      log.append(w.key, function (err) {
        res.end(w.key + '\n')
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
