class WeatherNotFoundError(Exception):
    def __init__(self, detail: str) -> None:
        self.detail = detail
