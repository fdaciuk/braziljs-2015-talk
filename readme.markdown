# what you can build with a log

---
# logs!

* append-only

can't change history!

non-orwellian data structure

---
# logs!

* append-only
* trivial replication

concat!

---
# logs as a data model for p2p webapps

* p2p delivery: inverse scaling
* offline data model

---
# things that suck about the web

* impermanence - web pages last on average 100 days

---
# impermanence

Remember geocities?

Twitter, gmail, flickr, github will all shut down eventually.

Every internet service you are currently using will close.

---
# things that suck about the web

* impermanence - web pages last on average 100 days
* centralization - somebody else controls your data

---
# goals

log structures make it easy to:

* archive (internet archive wants to do this!)
* fork
* use webapps offline
* trust delivery

---
# what we need to build a log

* one mutable pointer (~20 bytes)
* immutable blob storage

---
# time stamped log

```
Aug 21 07:35:22 zzz anacron[13449]: Job `cron.daily' terminated
Aug 21 07:35:22 zzz anacron[13449]: Normal exit (1 job run)
Aug 21 07:51:46 zzz dhclient: DHCPREQUEST on wlan0 to 192.168.43.1 port 67
Aug 21 07:51:46 zzz dhclient: DHCPACK from 192.168.43.1
```

not ideal for replication: what if clocks disagree?

---
# content-addressed log

1. hash each message
2. include the hash of the previous message in the current message

like git!

---
# content-addressed log example

    +++ hash: bd470e47e999a6cd94f7fc67bd0359eb91ddec59
    prev: null
    hello
    
    +++ hash: a6da22f22705aab17fd4063fef40305d04a8d14d
    prev: bd470e47e999a6cd94f7fc67bd0359eb91ddec59
    second msg!
    
    +++ hash: 589e87f23b2beea2338c830478d968b5f459f7c8
    prev: a6da22f22705aab17fd4063fef40305d04a8d14d
    third msg...

---
# content-addressable log

* like git! (merkle dag)
* natively supports forks
* offline replication

---
# content-addressable log

if you know the hashes, you know that you got the right data

so... you can fetch messages from anyone!

---
# content-addressable log security

by signing a message,
you certify the integrity of every included hash

so... you can securely point at external content keyed by its hash

---
# hyperlog

demo!

---
# hyperlog replication

demo!

---
# content-addressable-blob-store

and we'll need an immutable blob storage engine too

demo!

---
# torrent-blob-store

demo!

---
# img

demo!

---
# bep44 (bittorrent extension)

store a small (<1k) chunk of mutable data on the DHT

---
# bep44 (bittorrent extension)

store a small (<1k) chunk of mutable data on the DHT

now we can put a log in bittorrent!

---
# torrent log!

demo

---
EOF
