import logging
from os import environ

from fastapi import FastAPI, Request, HTTPException
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates

from app.weather_client.weather_api_keys_refresher import WeatherApiKeysRefresher
from app.weather_client.weather_api_settings import WeatherApiSettings
from app.weather_client.weather_api_client import WeatherClient
from app.weather_client.erros.all_api_keys_died_error import AllApiKeysDiedError
from app.weather_client.erros.weather_not_found_error import WeatherNotFoundError

app = FastAPI()

app.logger = logging.getLogger("uvicorn")
app.mount("/app/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")


@app.on_event("startup")
async def startup_event():
    weather_api_keys = environ.get("WEATHER_API_KEYS").split(';')
    weather_api_url = environ.get("WEATHER_API_URL")
    weather_api_settings = WeatherApiSettings(
        weather_api_url=weather_api_url,
        weather_api_keys=weather_api_keys
    )
    weather_client = WeatherClient(weather_api_settings, app.logger)
    weather_api_keys_refresher = WeatherApiKeysRefresher(weather_client.api_keys_manager)
    app.state.weather_client = weather_client
    weather_api_keys_refresher.run()


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/api/v1.0/nextWeek/byLocation")
async def next_week_weather_by_location(location: str, lang: str = 'ru', units: str = 'metric'):
    weather = await get_weather(app.state.weather_client.get_next_week_weather, location, lang, units)
    return weather


@app.get("/api/v1.0/nextWeek/byCoordinates")
async def next_week_weather_by_coordinates(lat: float, lon: float, lang: str = 'ru', units: str = 'metric'):
    coordinates_location = f'{lat},{lon}'
    weather = await get_weather(app.state.weather_client.get_next_week_weather, coordinates_location, lang, units)
    return weather


@app.get("/api/v1.0/today/byLocation")
async def today_weather_by_location(location: str, lang: str = 'ru', units: str = 'metric'):
    weather = await get_weather(app.state.weather_client.get_today_weather, location, lang, units)
    return weather


@app.get("/api/v1.0/today/byCoordinates")
async def today_weather_by_coordinates(lat: float, lon: float, lang: str = 'ru', units: str = 'metric'):
    coordinates_location = f'{lat},{lon}'
    weather = await get_weather(app.state.weather_client.get_today_weather, coordinates_location, lang, units)
    return weather


@app.get("/api/v1.0/now/byLocation")
async def current_weather_by_location(location: str, lang: str = 'ru', units: str = 'metric'):
    weather = await get_weather(app.state.weather_client.get_now_weather, location, lang, units)
    return weather


@app.get("/api/v1.0/now/byCoordinates")
async def current_weather_by_coordinates(lat: float, lon: float, lang: str = 'ru', units: str = 'metric'):
    coordinates_location = f'{lat},{lon}'
    weather = await get_weather(app.state.weather_client.get_now_weather, coordinates_location, lang, units)
    return weather


async def get_weather(get_weather_func: callable, coordinates_location: str, lang: str, units: str) -> dict:
    try:
        weather = await get_weather_func(coordinates_location, lang, units)
    except WeatherNotFoundError as err:
        app.logger.warning(f'{err.args[0]}')
        raise HTTPException(status_code=404, detail="Weather not found, try again later")
    except AllApiKeysDiedError:
        raise HTTPException(status_code=429, detail="Too many requests have been sent to weather api, try again later")

    return weather
