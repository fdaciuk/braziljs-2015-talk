// ...

var http = require('http')

var server = http.createServer(function (req, res) {
  if (/^(POST|PUT)$/.test(req.method)) {
    // ...
  }
  else res.end('not found\n')
})
server.listen(5000)

// ...
