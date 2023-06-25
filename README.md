# weather-app

## Запуск

```
>>> docker build -t weather-app-image .
>>> docker run -d --name weather-app-container -p 80:80 --env-file ./config/.env weather-app-image
```

### Структура `./config/.env` файла

```
WEATHER_API_KEYS=<API_KEY_1>;<API_KEY_2>
WEATHER_API_URL=<URL>
PORT=<PORT>
```
