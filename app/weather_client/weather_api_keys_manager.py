import asyncio
from typing import Union


class WeatherApiKeysManager:
    def __init__(self, weather_api_keys: list, max_request_count: int = 1000) -> None:
        self._max_request_count = max_request_count
        self._weather_api_keys = weather_api_keys
        self._priority_queue = asyncio.PriorityQueue(maxsize=len(weather_api_keys))
        for weather_api_key in weather_api_keys:
            self._priority_queue.put_nowait((0, weather_api_key))

    async def get_api_key(self) -> Union[str, None]:
        priority, api_key = await self._priority_queue.get()

        if priority < self._max_request_count:
            await self._priority_queue.put((priority + 1, api_key))
            return api_key

        await self._priority_queue.put((priority, api_key))
