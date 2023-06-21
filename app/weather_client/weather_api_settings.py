from dataclasses import dataclass


@dataclass(frozen=True)
class WeatherApiSettings:
    weather_api_url: str
    weather_api_keys: list
