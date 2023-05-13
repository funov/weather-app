# weather-app

## Запуск

```
>>> docker build -t weather-app-image .
>>> docker run -d --name weather-app-container -p 80:80 --env-file ./config/.env weather-app-image
```

### Структура `./config/.env` файла

```
WEATHER_API_KEY=<API_KEY>
CURRENT_WEATHER_URL=<CURRENT_WEATHER_URL>
FIVE_DAYS_WEATHER_URL=<FIVE_DAYS_WEATHER_URL>
```
