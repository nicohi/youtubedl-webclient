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

## test api

post
```
curl --request POST \
    --url http://localhost:8000/api/songs/ \
    --header 'content-type: application/json' \
    --data '{ "url": "test.url.com", "title": "testtitle", "filename": "test" }'
```

get all
```
curl --request GET \
  --url http://localhost:8000/api/songs/ \
  --header 'content-type: application/json'
```

get based on id
```
curl --request GET \
  --url http://localhost:8000/api/songs/1/ \
  --header 'content-type: application/json'
```

delete based on id
```
curl --request DELETE \
  --url http://localhost:8000/api/songs/1/ \
  --header 'content-type: application/json'
```

http://v1k45.com/blog/modern-django-part-1-setting-up-django-and-react/

http://v1k45.com/blog/modern-django-part-2-redux-and-react-router-setup/
