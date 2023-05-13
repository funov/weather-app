document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    await fetchWeatherData(city);
});

async function fetchWeatherData(location) {
    const response = await fetch(`/api/v1.0/current/${location}`);
    const data = await response.json();

    if (response.ok) {
        displayWeatherData(data);
    } else {
        alert('Ухх...');
    }
}

function displayWeatherData(data) {
    document.getElementById('location').innerText = data.location;
    document.getElementById('temperature').innerText = `Температура ${data.temperature}°C`;
    document.getElementById('description').innerText = data.description;
    document.getElementById('icon_id').innerText = `${data.icon_id} код картинки, чтобы выкачать потом его🤩🤩`;
    document.getElementById('weather_time').innerText = `${data.weather_time} время погоды в unix`;
    document.getElementById('humidity').innerText = `Влажность ${data.humidity}%`;
    document.getElementById('pressure').innerText = `Давление ${data.pressure}%`;
    document.getElementById('visibility').innerText = `Видно ${data.visibility} м.`;
    document.getElementById('temperature_feels_like').innerText = `Ощущается ${data.temperature_feels_like}°C`;
    document.getElementById('wind_speed').innerText = `Скорость ветра ${data.wind_speed} м./с.`;

    document.getElementById('weatherDisplay').style.display = 'block';
}
