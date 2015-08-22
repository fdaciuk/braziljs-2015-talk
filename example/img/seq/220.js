var blob = require('content-addressable-blob-store')
var store = blob('./data/ephemera.blob')
var tblob = require('torrent-blob-store')
var tstore = tblob({ trackers: [ 'udp://localhost:9000' ] })

// ...
