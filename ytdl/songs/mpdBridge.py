import mpd

def queue_song(song, ip, port):
    client = mpd.MPDClient()
    client.connect(ip, port)
    client.add(song)
    print(client.playlist())
    client.disconnect()
    #client = mpd.MPDClient(use_unicode=True)
    #client.connect("localhost", 6600)
    #client.add('file:///home/sakamoto/music/01 - Moth.flac')
    #for entry in client.lsinfo("/"):
    #    print("%s" % entry)
    #for key, value in client.status().items():
    #    print("%s: %s" % (key, value))
