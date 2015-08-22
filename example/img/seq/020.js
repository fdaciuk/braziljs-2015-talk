var level = require('level')
var db = level('./data/ephemera.db')

var hyperlog = require('hyperlog')
var log = hyperlog(db, { valueEncoding: 'json' })
