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
    fetch(`/api/v1.0/current/${store.city}`,
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

      // if (hourlyOrWeek === "hourly") {
      //   updateForecast(data.days[0].hours, unit, "day");
      // } else {
      //   updateForecast(data.days, unit, "week");
      // }
    })
    .catch((err) => {
      alert("City not found in our database");
    });
}


const handleInput = (e) => {
    store = {
        ...store, city: e.target.value,
    };
};

const handleClose = () => {
    popup.classList.toggle("active");
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const value = store.city;

    if (!value) return null;

    localStorage.setItem("query", value);
    togglePopupClass();
    await getWeatherData();
};

form.addEventListener("submit", handleSubmit);
textInput.addEventListener("input", handleInput);
close.addEventListener("click", handleClose);
getWeatherData().then();
