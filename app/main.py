from os import environ

from fastapi import FastAPI, Request
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates

from app.weather_client.open_weather_api_urls import WeatherApiUrls
from app.weather_client.open_weather_client import WeatherClient

app = FastAPI()
app.mount("/app/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")


@app.on_event("startup")
async def startup_event():
    weather_api_key = environ.get("WEATHER_API_KEY")
    weather_api_urls = WeatherApiUrls(
        get_current_weather_url=environ.get("CURRENT_WEATHER_URL"),
        get_five_days_weather_url=environ.get("FIVE_DAYS_WEATHER_URL")
    )
    app.state.weather_client = WeatherClient(
        weather_api_key,
        weather_api_urls
    )


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/api/v1.0/current/{location}")
async def say_hello(location: str, lang: str = 'ru', units: str = 'metric'):
    weather = await app.state.weather_client.get_current_weather(
        location,
        lang,
        units
    )
    return weather
