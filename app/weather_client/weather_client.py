import httpx
import logging

from httpx import Response

from app.weather_client.weather_api_urls import WeatherApiUrls


class WeatherClient:
    def __init__(self, weather_api_key: str, weather_api_urls: WeatherApiUrls, logger: logging.Logger) -> None:
        self.weather_api_key = weather_api_key
        self.weather_api_urls = weather_api_urls
        self.logger = logger

    async def get_current_weather_by_location(self, location: str, lang: str, units: str) -> dict:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                self.weather_api_urls.get_current_weather_url,
                params={
                    'appid': self.weather_api_key,
                    'q': location,
                    'lang': lang,
                    'units': units
                }
            )
        return self._parse_weather(response)

    async def get_current_weather_by_lat_lon(self, lat: int, lon: int, lang: str, units: str) -> dict:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                self.weather_api_urls.get_current_weather_url,
                params={
                    'appid': self.weather_api_key,
                    'lat': lat,
                    'lon': lon,
                    'lang': lang,
                    'units': units
                }
            )
        return self._parse_weather(response)

    def _parse_weather(self, response: Response) -> dict:
        status_code = response.status_code
        url = response.url
        http_version = response.http_version
        self.logger.info(f'GET {url} {http_version} {status_code}')
        response_json = response.json()

        if status_code != 200:
            return {}

        description = response_json['weather'][0]['description']
        icon_id = response_json['weather'][0]['icon'][:-1]
        return {
            'location': response_json['name'],
            'temperature': response_json['main']['temp'],
            'description': description.capitalize(),
            'icon_id': icon_id,
            'weather_time': response_json['dt'],
            'humidity': response_json['main']['humidity'],
            'pressure': response_json['main']['pressure'],
            'visibility': response_json['visibility'],
            'temperature_feels_like': response_json['main']['feels_like'],
            'wind_speed': response_json['wind']['speed'],
            'timezone': response_json['timezone']
        }

    async def get_five_days_weather_by_location(self) -> None:
        raise NotImplementedError()

    async def get_five_days_weather_by_coordinates(self) -> None:
        raise NotImplementedError()
