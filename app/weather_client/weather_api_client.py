import httpx
import logging
import asyncio
from httpx import Response
from app.weather_client.erros.all_api_keys_died_error import AllApiKeysDiedError
from app.weather_client.erros.weather_not_found_error import WeatherNotFoundError
from app.weather_client.weather_api_keys_manager import WeatherApiKeysManager
from app.weather_client.weather_api_settings import WeatherApiSettings


class WeatherClient:
    def __init__(self, weather_api_settings: WeatherApiSettings, logger: logging.Logger) -> None:
        self._elements = [
            'timezone', 'temp', 'datetime', 'conditions', 'resolvedAddress', 'uvindex', 'visibility',
            'humidity', 'windspeed', 'icon', 'feelslike', 'tempmin', 'tempmax', 'hours', 'winddir', 'days'
        ]
        self.elements = ','.join(self._elements)

        self._weather_api_keys = weather_api_settings.weather_api_keys
        self._weather_api_url = weather_api_settings.weather_api_url
        self.api_keys_manager = WeatherApiKeysManager(self._weather_api_keys, logger)
        self.logger = logger
        self.http_client = httpx.AsyncClient(base_url=self._weather_api_url)

    def __del__(self):
        asyncio.run(self.http_client.aclose())

    async def get_next_week_weather(self, location: str, lang: str = 'ru', unit_group: str = 'metric') -> dict:
        response = await self._send_weather_request(f'/{location}/next7days', lang, unit_group)
        response_json = response.json()
        days = self._get_days_from_json(response_json['days'])

        return {
            'timezone': response_json['timezone'],
            'location': response_json['resolvedAddress'],
            'days': days
        }

    async def get_today_weather(self, location: str, lang: str = 'ru', unit_group: str = 'metric') -> dict:
        response = await self._send_weather_request(f'/{location}/today', lang, unit_group)
        response_json = response.json()
        days = self._get_days_from_json(response_json['days'])

        return {
            'timezone': response_json['timezone'],
            'location': response_json['resolvedAddress'],
            'day': days[0]
        }

    async def get_now_weather(self, location: str, lang: str = 'ru', unit_group: str = 'metric') -> dict:
        response = await self._send_weather_request(f'/{location}/today', lang, unit_group)
        response_json = response.json()
        current_conditions = response_json['currentConditions']
        today = response_json['days'][0]

        return {
            'timezone': response_json['timezone'],
            'location': response_json['resolvedAddress'],
            'temperature': current_conditions['temp'],
            'description': current_conditions['conditions'],
            'uvIndex': current_conditions['uvindex'],
            'visibility': current_conditions['visibility'],
            'humidity': current_conditions['humidity'],
            'windSpeed': current_conditions['windspeed'],
            'icon': current_conditions['icon'],
            'feelsLike': current_conditions['feelslike'],
            'temperatureMin': today['tempmin'],
            'temperatureMax': today['tempmax'],
            'airQuality': today['winddir']
        }

    async def _send_weather_request(self, url: str, lang: str, unit_group: str) -> Response:
        api_key = await self.api_keys_manager.get_api_key()

        if api_key is None:
            raise AllApiKeysDiedError("Api keys died, but they will be updated soon")

        try:
            response = await self.http_client.get(url, params={
                'key': api_key,
                'lang': lang,
                'unitGroup': unit_group,
                'elements': self.elements
            })
        except httpx.TimeoutException:
            raise WeatherNotFoundError("Weather not found because of timeout")

        logging_url = f'...{url}?key={api_key}&lang={lang}&unitGroup={unit_group}&elements=...'
        self.logger.info(f'[WeatherApiClient] GET {logging_url} {response.http_version} {response.status_code}')

        if response.status_code != 200:
            raise WeatherNotFoundError("Weather api response status code not equal 200")

        return response

    @staticmethod
    def _get_hours_from_json(hours_json: dict) -> list:
        hours = []

        for hour_json in hours_json:
            hour = {
                'hour': hour_json['datetime'],
                'temperature': hour_json['temp'],
                'icon': hour_json['icon']
            }
            hours.append(hour)

        return hours

    @staticmethod
    def _get_days_from_json(days_json: dict) -> list:
        days = []

        for day_json in days_json:
            hours_json = day_json['hours']
            hours = WeatherClient._get_hours_from_json(hours_json)
            day = {
                'date': day_json['datetime'],
                'hours': hours
            }
            days.append(day)

        return days
