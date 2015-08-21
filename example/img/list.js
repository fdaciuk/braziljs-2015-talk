var hyperlog = require('hyperlog')
var level = require('level')
var through = require('through2')
var db = level('./data/replica.db')


var log = hyperlog(db, { valueEncoding: 'json' })
log.createReadStream().pipe(through.obj(write))

function write (row, enc, next) {
  console.log(row.value)
  next()
}
