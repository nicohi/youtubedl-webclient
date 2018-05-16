from __future__ import unicode_literals
#import sys
import youtube_dl

#global variables
data = {'filename': '', 'url': '', 'title': '', } 

class MyLogger(object):
    def debug(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)


def handle_finished(d):
    #turn video filename into .mp3 (youtubedl gives filename before conversion to mp3)
    filename1 = d['filename'].split('/')[-1].split('.')[0] 
    filename2 = d['filename'].split('/')[-1]
    global data
    data['filename'] = filename2
    data['title'] = filename1
    #print()

def my_hook(d):
    print(d)
    if d['status'] == 'downloading':
        print('Downloading')
    if d['status'] == 'finished':
        handle_finished(d)
        print('Done downloading, now converting ...')

def dl_url(url, direc):
    global data
    data['url'] = url
    ydl_opts = {
        'format': 'bestaudio/best',
        #'format': 'best',
        'download_archive': direc + 'downloaded_songs.txt',
        'outtmpl': direc + '%(title)s.%(ext)s',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            #'key': 'AvConvExtractAudio',
            'preferredcodec': 'mp3',
            #'preferredcodec': 'libmp3lame',
            'preferredquality': '192',
        }],
        'quiet': 'False',
        'logger': MyLogger(),
        'progress_hooks': [my_hook],
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    return data

#print(dl_url(sys.argv[1], sys.argv[2]))
