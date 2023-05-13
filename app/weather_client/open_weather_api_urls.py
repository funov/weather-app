from dataclasses import dataclass


@dataclass(frozen=True)
class WeatherApiUrls:
    get_current_weather_url: str
    get_five_days_weather_url: str
