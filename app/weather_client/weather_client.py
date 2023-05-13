import httpx
from app.weather_client.weather_api_urls import WeatherApiUrls


class WeatherClient:
    def __init__(
            self,
            weather_api_key: str,
            weather_api_urls: WeatherApiUrls) -> None:
        self.weather_api_key = weather_api_key
        self.weather_api_urls = weather_api_urls

    async def get_current_weather(
            self,
            location: str,
            lang: str,
            units: str) -> dict:
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
        response_json = response.json()

        if int(response_json['cod']) == 404 \
                and response_json['message'] == 'city not found':
            return {
                'is_success': False,
                'error_message': 'Location not found'
            }

        if int(response_json['cod']) != 200:
            return {
                'is_success': False,
                'error_message': None
            }

        return {
            'is_success': True,
            'location': response_json['name'],
            'temperature': response_json['main']['temp'],
            'description': response_json['weather'][0]['description'],
            'icon_id': response_json['weather'][0]['icon'],
            'weather_time': response_json['dt'],
            'humidity': response_json['main']['humidity'],
            'pressure': response_json['main']['pressure'],
            'visibility': response_json['visibility'],
            'temperature_feels_like': response_json['main']['feels_like'],
            'wind_speed': response_json['wind']['speed']
        }

    async def get_five_days_weather(self) -> None:
        raise NotImplementedError()
