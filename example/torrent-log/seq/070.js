// ...

var http = require('http')
var concat = require('concat-stream')
var server = http.createServer(function (req, res) {
  if (/^(POST|PUT)$/.test(req.method)) {
    req.pipe(concat(function (body) {
      // ...
    }))
  }
  else res.end('not found\n')
})
server.listen(5000)

// ...
