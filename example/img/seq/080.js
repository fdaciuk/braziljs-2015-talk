// ...

var http = require('http')
var server = http.createServer(function (req, res) {
  if (/^(POST|PUT)$/.test(req.method)) {
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
