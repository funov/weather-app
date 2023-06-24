import logging
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.weather_client.weather_api_keys_manager import WeatherApiKeysManager
from datetime import datetime, timedelta


class WeatherApiKeysRefresher:
    def __init__(self, weather_api_keys_manager: WeatherApiKeysManager, logger: logging.Logger) -> None:
        self.logger = logger
        self.weather_api_keys_manager = weather_api_keys_manager

    def run(self) -> None:
        scheduler = AsyncIOScheduler()
        now = datetime.now()
        start_time = now.replace(hour=0, minute=0, second=0, microsecond=0)
        start_time += timedelta(days=1)

        scheduler.add_job(self.weather_api_keys_manager.refresh_api_keys, 'interval', days=1, start_date=start_time)
        self.logger.info(f'[WeatherApiKeysRefresher] Start WeatherApiKeysRefresher with {start_time = }')
        scheduler.start()
