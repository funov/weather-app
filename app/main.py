from os import environ
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    api_key = environ.get('WEATHER_API_KEY')
    return {"message": f"Hello World {api_key = }"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
