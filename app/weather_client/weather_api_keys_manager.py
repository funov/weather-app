import asyncio
import logging
from typing import Union


class WeatherApiKeysManager:
    def __init__(self, weather_api_keys: list, logger: logging.Logger, max_request_count: int = 1000) -> None:
        self.logger = logger
        self._max_request_count = max_request_count
        self._weather_api_keys = weather_api_keys
        self._priority_queue = asyncio.PriorityQueue(maxsize=len(weather_api_keys))
        for weather_api_key in weather_api_keys:
            self._priority_queue.put_nowait((0, weather_api_key))

    async def get_api_key(self) -> Union[str, None]:
        priority, api_key = await self._priority_queue.get()

        if priority < self._max_request_count:
            await self._priority_queue.put((priority + 1, api_key))
            self.logger.info(f'[WeatherApiKeysManager] {api_key = } issued with {priority = }')
            return api_key

        self.logger.warning('[WeatherApiKeysManager] All api_keys died, wait for refresh')
        await self._priority_queue.put((priority, api_key))

    async def refresh_api_keys(self) -> None:
        self.logger.info('[WeatherApiKeysManager] Start refreshing api_keys')

        for i in range(len(self._weather_api_keys)):
            _, _ = await self._priority_queue.get()

        for weather_api_key in self._weather_api_keys:
            await self._priority_queue.put((0, weather_api_key))

        self.logger.info('[WeatherApiKeysManager] Api_keys refreshed')
