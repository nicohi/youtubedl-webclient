# youtubedl-webclient

## develop
run backend
```
cd ytdl
python manage.py runserver

```

run frontend
```
cd ytdl/ytdlfrontend
npm start
```

## deploy?

build react stuff
```
cd ytdl/ytdlfrontend
npm run build
```

run backend with production settings
```
cd ytdl
python manage.py runserver --settings=ytdlbackend.production_settings
```


http://v1k45.com/blog/modern-django-part-1-setting-up-django-and-react/

