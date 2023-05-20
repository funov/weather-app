const temp = document.getElementById("temp"),
    date = document.getElementById("date-time"),
    description = document.getElementById("description"),
    mainIcon = document.getElementById("icon"),
    currentLocation = document.getElementById("location"),
    uvIndex = document.querySelector(".uv-index"),
    uvText = document.querySelector(".uv-text"),
    windSpeed = document.querySelector(".wind-speed"),
    humidity = document.querySelector(".humidity"),
    visibility = document.querySelector(".visibility"),
    humidityStatus = document.querySelector(".humidity-status"),
    visibilityStatus = document.querySelector(".visibility-status"),
    searchForm = document.querySelector("#search"),
    search = document.querySelector("#query"),
    celsiusBtn = document.querySelector(".celsius"),
    fahrenheitBtn = document.querySelector(".fahrenheit"),
    tempUnit = document.querySelectorAll(".temp-unit"),
    hourlyBtn = document.querySelector(".hourly"),
    weekBtn = document.querySelector(".week"),
    weatherCards = document.querySelector("#weather-cards");

let currentCity = "";
let currentUnit = "c";
let hourlyOrWeek = "week";

const getWeatherData = async (city, unit, hourlyOrWeek) => {
    fetch(`/api/v1.0/current/${city}`,
        {
            method: "GET",
            headers: {},
        }
    )
        .then((response) => response.json())
        .then((weather) => {
            if (unit === "c") {
                temp.innerText = Math.round(weather.temperature);
            } else {
                console.log(unit);
                console.log(celsiusToFahrenheit(weather.temperature));
                temp.innerText = celsiusToFahrenheit(weather.temperature);
            }
            currentLocation.innerText = currentCity;
            description.innerText = weather.description;

            uvIndex.innerText = 3; // потом брать из weather
            windSpeed.innerText = `${weather.wind_speed} м/с`;
            measureUvIndex(3);
            // mainIcon.src = getIcon(today.icon); //получение картинки
            // changeBackground(today.icon);
            humidity.innerText = `${weather.humidity} %`;
            updateHumidityStatus(weather.humidity);
            visibility.innerText = `${(weather.visibility / 1000).toFixed(1)} км`;
            updateVisibilityStatus(visibility.innerText); //?

        })
        .catch((err) => {
            alert(err);
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
            getWeatherData(data.city, currentUnit, hourlyOrWeek);
        })
        .catch((err) => {
            console.error(err);
        });
}

function updateHumidityStatus(humidity) {
    if (humidity <= 30) {
        humidityStatus.innerText = "Очень сухой воздух";
    } else if (humidity < 55) {
        humidityStatus.innerText = "Сухой воздух";
    } else if (humidity < 70) {
        humidityStatus.innerText = "Умеренно сухой воздух";
    } else if (humidity < 85) {
        humidityStatus.innerText = "Умеренно влажный воздух";
    } else {
        humidityStatus.innerText = "Очень влажный воздух";
    }
}

function measureUvIndex(uvIndex) {
    if (uvIndex <= 2) {
        uvText.innerText = "Низкий";
    } else if (uvIndex <= 5) {
        uvText.innerText = "Умеренный";
    } else if (uvIndex <= 7) {
        uvText.innerText = "Высокий";
    } else if (uvIndex <= 10) {
        uvText.innerText = "Очень высокий";
    } else {
        uvText.innerText = "Крайне высокий";
    }
}

function updateVisibilityStatus(visibility) {
    if (visibility <= 0.5) {
        visibilityStatus.innerText = "Густой туман";
    } else if (visibility < 1) {
        visibilityStatus.innerText = "Туман";
    } else if (visibility < 10) {
        visibilityStatus.innerText = "Дымка";
    } else {
        visibilityStatus.innerText = "Совершенно ясно";
    }
}

function changeUnit(unit) {
    if (currentUnit !== unit) {
        currentUnit = unit;
        tempUnit.forEach((elem) => {
            elem.innerText = `°${unit.toUpperCase()}`;
        });
        if (unit === "c") {
            celsiusBtn.classList.add("active");
            fahrenheitBtn.classList.remove("active");
        } else {
            celsiusBtn.classList.remove("active");
            fahrenheitBtn.classList.add("active");
        }
        getWeatherData(currentCity, currentUnit, hourlyOrWeek);
    }
}

function celsiusToFahrenheit(temp) {
  return ((temp * 9) / 5 + 32).toFixed(1);
}

fahrenheitBtn.addEventListener("click", () => {
  changeUnit("f");
});

celsiusBtn.addEventListener("click", () => {
  changeUnit("c");
});


getPublicIp();
