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
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`,
        {
        method: "GET",
        headers: {},
    })
        .then((response) => response.json())
        .then((data) => {
            let weather = data.currentConditions;
            if (unit === "c") {
                temp.innerText = Math.round(weather.temp);
            } else {
                temp.innerText = celsiusToFahrenheit(weather.temp);
            }
            currentLocation.innerText = data.resolvedAddress;
            description.innerText = weather.conditions;

            uvIndex.innerText = weather.uvindex;
            windSpeed.innerText = `${Math.round(weather.windspeed / 3.6)} м/с`;
            measureUvIndex(weather.uvindex);
            // mainIcon.src = getIcon(today.icon); //получение картинки
            // changeBackground(today.icon);
            humidity.innerText = `${weather.humidity} %`;
            updateHumidityStatus(weather.humidity);
            visibility.innerText = `${weather.visibility} км`;
            updateVisibilityStatus(visibility.innerText);
            if (hourlyOrWeek === "hourly") {
                updateForecast(data.days[0].hours, unit, "day");
            } else {
                updateForecast(data.days, unit, "week");
            }
        })
        .catch((err) => {
            alert(err);
        });
}

function updateForecast(data, unit, type) {
    weatherCards.innerHTML = "";
    let day = 0;
    let numCards = 0;
    if (type === "day") {
        numCards = 24;
    } else {
        numCards = 7;
    }
    for (let i = 0; i < numCards; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        let dayName = getHour(data[day].datetime);
        if (type === "week") {
            dayName = getDayName(data[day].datetime);
        }
        let dayTemp = Math.round(data[day].temp);
        if (unit === "f") {
            dayTemp = celsiusToFahrenheit(data[day].temp);
        }
        // let iconCondition = data[day].icon;
        // let iconSrc = getIcon(iconCondition);
        let tempUnit = "°C";
        if (unit === "f") {
            tempUnit = "°F";
        }
        card.innerHTML = `
                <h2 class="day-name">${dayName}</h2>
            <div class="card-icon">
            </div>
            <div class="day-temp">
              <h2 class="temp">${dayTemp}</h2>
              <span class="temp-unit">${tempUnit}</span>
            </div>`;
        weatherCards.appendChild(card);
        day++;
    }
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

function getHour(time) {
    let hour = time.split(":")[0];
    let min = time.split(":")[1];
    if (hour > 12) {
        hour = hour - 12;
        return `${hour}:${min} PM`;
    } else {
        return `${hour}:${min} AM`;
    }
}

function getDayName(date) {
    let day = new Date(date);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return days[day.getDay()];
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

function changeHourlyOrWeek(unit) {
    if (hourlyOrWeek !== unit) {
        hourlyOrWeek = unit;
        if (unit === "hourly") {
            hourlyBtn.classList.add("active");
            weekBtn.classList.remove("active");
        } else {
            hourlyBtn.classList.remove("active");
            weekBtn.classList.add("active");
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

hourlyBtn.addEventListener("click", () => {
    changeHourlyOrWeek("hourly");
});

weekBtn.addEventListener("click", () => {
    changeHourlyOrWeek("week");
});



getPublicIp();
