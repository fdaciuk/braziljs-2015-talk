var store = require('torrent-blob-store')
var blob = store({
  trackers: ['udp://localhost:9000']
})

if (process.argv[2] === 'put') {
  process.stdin.pipe(blob.createWriteStream(function (err, w) {
    console.log(w.key)
  }))
} else if (process.argv[2] === 'get') {
  blob.createReadStream(process.argv[3]).pipe(process.stdout)
}
