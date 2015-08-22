var http = require('http')
var server = http.createServer(function (req, res) {
  // ...
})
server.listen(5000)

var wsock = require('websocket-stream')
wsock.createServer({ server: server }, function (stream) {
  // ...
})
