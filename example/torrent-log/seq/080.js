// ...

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

function post (value, cb) { /* ... */ }

// ...
