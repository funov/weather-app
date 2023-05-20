const temp = document.getElementById("temp"),
    date = document.getElementById("date-time"),
    description = document.getElementById("description"),
    rain = document.getElementById("rain"),
    mainIcon = document.getElementById("icon"),
    currentLocation = document.getElementById("location"),
    uvIndex = document.querySelector(".uv-index"),
    uvText = document.querySelector(".uv-text"),
    windSpeed = document.querySelector(".wind-speed"),
    sunRise = document.querySelector(".sun-rise"),
    sunSet = document.querySelector(".sun-set"),
    humidity = document.querySelector(".humidity"),
    visibilty = document.querySelector(".visibilty"),
    humidityStatus = document.querySelector(".humidity-status"),
    airQuality = document.querySelector(".air-quality"),
    airQualityStatus = document.querySelector(".air-quality-status"),
    visibilityStatus = document.querySelector(".visibilty-status"),
    searchForm = document.querySelector("#search"),
    search = document.querySelector("#query"),
    celciusBtn = document.querySelector(".celcius"),
    fahrenheitBtn = document.querySelector(".fahrenheit"),
    tempUnit = document.querySelectorAll(".temp-unit"),
    hourlyBtn = document.querySelector(".hourly"),
    weekBtn = document.querySelector(".week"),
    weatherCards = document.querySelector("#weather-cards");

let currentCity = "";
let currentUnit = "c";
let hourlyorWeek = "week";

const getWeatherData = async (city, unit, hourlyOrWeek) => {
    fetch(`/api/v1.0/current/${city}`,
        {
            method: "GET",
            headers: {},
        }
    )
    .then((response) => response.json())
    .then((weather) => {
      temp.innerText = Math.round(weather.temperature);
      currentLocation.innerText = weather.location;
      description.innerText = weather.description;

      uvIndex.innerText = 3; // потом брать из weather
      windSpeed.innerText = weather.wind_speed;
      measureUvIndex(3); //?
      mainIcon.src = getIcon(today.icon); //получение картинки
      // changeBackground(today.icon);
      humidity.innerText = weather.humidity + "%";
      updateHumidityStatus(weather.humidity);
      visibilty.innerText = (weather.visibility / 1000).toFixed(1);
      updateVisibiltyStatus(visibilty.innerText); //?

    })
    .catch((err) => {
      alert("Предоставить доступ к геоданным");
    });
}


function getPublicIp() {
  fetch("https://geolocation-db.com/json/", {
    method: "GET",
    headers: {},
  })
    .then((response) => response.json())
    .then((data) => {
      currentCity = data.city;
      getWeatherData(data.city, currentUnit, hourlyorWeek);
    })
    .catch((err) => {
      console.error(err);
    });
}

getPublicIp();
