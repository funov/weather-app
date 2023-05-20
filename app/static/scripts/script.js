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


let store = {
    city: "Minsk",
    temperature: 0,
    weatherTime: "00:00 AM",
    timezone: 3600,
    description: "",
    iconId: '01',
    properties: {
        humidity: {},
        windSpeed: {},
        pressure: {},
        feelsLike: {},
        visibility: {},
    },
};

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

      if (hourlyOrWeek === "hourly") {
        updateForecast(data.days[0].hours, unit, "day");
      } else {
        updateForecast(data.days, unit, "week");
      }
    })
    .catch((err) => {
      alert("City not found in our database");
    });
}

const renderProperty = (properties) => {
    return Object.values(properties)
        .map(({title, value, icon}) => {
            return `<div class="property">
            <div class="property-icon">
              <img src="./app/static/images/properties_icons/${icon}" alt="">
            </div>
            <div class="property-info">
              <div class="property-info__value">${value}</div>
              <div class="property-info__description">${title}</div>
            </div>
          </div>`;
        })
        .join("");
};

const markup = () => {
    const {city, description, weatherTime, temperature, timezone, properties, iconId} = store;

    let date = new Date(new Date((weatherTime + timezone) * 1000).toISOString());
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    const localTime = `${hours}:${minutes}`;
    const containerClass = hours > 6 && hours < 20 ? "is-day" : "";

    return `<div class="container ${containerClass}">
            <div class="top">
              <div class="city">
                <div class="city-subtitle">Погода сегодня</div>
                  <div class="city-title" id="city">
                  <span>${city}</span>
                </div>
              </div>
              <div class="city-info">
                <div class="top-left">
                <img class="icon" src="./app/static/images/weather_icons/${iconId}.png" alt="" />
                <div class="description">${description}</div>
              </div>
            
              <div class="top-right">
                <div class="city-info__subtitle">Время ${localTime}</div>
                <div class="city-info__title">${temperature}°</div>
              </div>
            </div>
          </div>
        <div id="properties">${renderProperty(properties)}</div>
      </div>`;
};

const togglePopupClass = () => {
    popup.classList.toggle("active");
};

const renderComponent = () => {
    root.innerHTML = markup();

    const city = document.getElementById("city");
    city.addEventListener("click", togglePopupClass);
};

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
