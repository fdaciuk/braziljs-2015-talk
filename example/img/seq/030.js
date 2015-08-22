var level = require('level')
var db = level('./data/ephemera.db')

var hyperlog = require('hyperlog')
var log = hyperlog(db, { valueEncoding: 'json' })

var http = require('http')
var server = http.createServer(function (req, res) {
  // ...
})
server.listen(5000)
