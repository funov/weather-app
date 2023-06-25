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

    async def kill_api_key(self, api_key_to_kill: str) -> None:
        for i in range(len(self._weather_api_keys)):
            priority, api_key = await self._priority_queue.get()

            if api_key == api_key_to_kill:
                await self._priority_queue.put((self._max_request_count, api_key))
                self.logger.warning(f'[WeatherApiKeysManager] {api_key = } killed')
                break

            await self._priority_queue.put((priority, api_key))

    async def refresh_api_keys(self) -> None:
        self.logger.info('[WeatherApiKeysManager] Start refreshing api_keys')

        for i in range(len(self._weather_api_keys)):
            _ = await self._priority_queue.get()

        for weather_api_key in self._weather_api_keys:
            self.logger.info(f'[WeatherApiKeysManager] {weather_api_key = } refreshed')
            await self._priority_queue.put((0, weather_api_key))

        self.logger.info('[WeatherApiKeysManager] Api_keys refreshed')
