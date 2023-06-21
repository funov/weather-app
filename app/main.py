import logging
from os import environ

from fastapi import FastAPI, Request, HTTPException
# from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
# from fastapi.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates

from app.weather_client.weather_api_keys_refresher import WeatherApiKeysRefresher
from app.weather_client.weather_api_settings import WeatherApiSettings
from app.weather_client.weather_api_client import WeatherClient

app = FastAPI()

# TODO
# origins = [
#     "http://localhost.tiangolo.com",
#     "https://localhost.tiangolo.com",
#     "http://localhost",
#     "http://localhost:8080",
# ]

# TODO
# app.add_middleware(HTTPSRedirectMiddleware)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_methods=["GET"],
#     allow_headers=["*"]
# )

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
    weather = await app.state.weather_client.get_next_week_weather(location, lang, units)

    # TODO
    if len(weather.keys()) == 0:
        raise HTTPException(status_code=404, detail="Weather not found")

    return weather


@app.get("/api/v1.0/nextWeek/byCoordinates")
async def next_week_weather_by_coordinates(lat: float, lon: float, lang: str = 'ru', units: str = 'metric'):
    coordinates_location = f'{lat},{lon}'
    weather = await app.state.weather_client.get_next_week_weather(coordinates_location, lang, units)

    # TODO
    if len(weather.keys()) == 0:
        raise HTTPException(status_code=404, detail="Weather not found")

    return weather


@app.get("/api/v1.0/today/byLocation")
async def today_weather_by_location(location: str, lang: str = 'ru', units: str = 'metric'):
    weather = await app.state.weather_client.get_today_weather(location, lang, units)

    # TODO
    if len(weather.keys()) == 0:
        raise HTTPException(status_code=404, detail="Weather not found")

    return weather


@app.get("/api/v1.0/today/byCoordinates")
async def today_weather_by_coordinates(lat: float, lon: float, lang: str = 'ru', units: str = 'metric'):
    coordinates_location = f'{lat},{lon}'
    weather = await app.state.weather_client.get_today_weather(coordinates_location, lang, units)

    # TODO
    if len(weather.keys()) == 0:
        raise HTTPException(status_code=404, detail="Weather not found")

    return weather


@app.get("/api/v1.0/now/byLocation")
async def current_weather_by_location(location: str, lang: str = 'ru', units: str = 'metric'):
    weather = await app.state.weather_client.get_now_weather(location, lang, units)

    # TODO
    if len(weather.keys()) == 0:
        raise HTTPException(status_code=404, detail="Weather not found")

    return weather


@app.get("/api/v1.0/now/byCoordinates")
async def current_weather_by_coordinates(lat: float, lon: float, lang: str = 'ru', units: str = 'metric'):
    coordinates_location = f'{lat},{lon}'
    weather = await app.state.weather_client.get_now_weather(coordinates_location, lang, units)

    # TODO
    if len(weather.keys()) == 0:
        raise HTTPException(status_code=404, detail="Weather not found")

    return weather
