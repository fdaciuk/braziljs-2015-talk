var wsock = require('websocket-stream')
var hyperlog = require('hyperlog')
var level = require('level')
var db = level('./data/replica.db')

var log = hyperlog(db, { valueEncoding: 'json' })
var r = log.replicate()
r.pipe(wsock('ws://localhost:5000')).pipe(r)
