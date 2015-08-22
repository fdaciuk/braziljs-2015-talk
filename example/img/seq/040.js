var level = require('level')
var db = level('./data/ephemera.db')

var hyperlog = require('hyperlog')
var log = hyperlog(db, { valueEncoding: 'json' })

var blob = require('content-addressable-blob-store')
var store = blob('./data/ephemera.blob')

var http = require('http')
var server = http.createServer(function (req, res) {
  // ...
})
server.listen(5000)
