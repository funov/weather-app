import {StatusUpdater} from './StatusUpdater.js';
import {DocumentElements} from './DocumentElements.js';

const documentElements = new DocumentElements();
let currentCity = "";
let currentUnit = "c";
let hourlyOrWeek = "week";

const changeWeatherData = async (city, unit, hourlyOrWeek) => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`,
        {
            method: "GET",
            headers: {},
        })
        .then((response) => response.json())
        .then((data) => {
            let weather = data.currentConditions;
            changeSidebarData(data, weather, unit);
            changeMediumCardText(weather, unit, hourlyOrWeek)
            updateMediumCardStatus();
            if (hourlyOrWeek === "hourly") {
                updateForecast(data.days[0].hours, unit, "day");
            } else {
                updateForecast(data.days, unit, "week");
            }
            // changeBackground(today.icon);
        })
        .catch((err) => {
            alert(err);
        });
}

function changeSidebarData(data, weather, unit) {
    documentElements.currentLocation.innerText = data.resolvedAddress;
    documentElements.description.innerText = weather.conditions;
    if (unit === "c") {
        documentElements.temp.innerText = Math.round(weather.temp);
    } else {
        documentElements.temp.innerText = celsiusToFahrenheit(weather.temp);
    }
    // mainIcon.src = getIcon(today.icon); //получение картинки
}

function updateForecast(data, unit, type) {
    documentElements.weatherCards.innerHTML = "";
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
        documentElements.weatherCards.appendChild(card);
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
            changeWeatherData(data.city, currentUnit, hourlyOrWeek);
        })
        .catch((err) => {
            console.error(err);
        });
}

function changeMediumCardText(weather, unit, hourlyOrWeek) {
    documentElements.uvIndex.innerText = weather.uvindex;
    documentElements.windSpeed.innerText = `${Math.round(weather.windspeed / 3.6)} м/с`;
    documentElements.humidity.innerText = `${weather.humidity} %`;
    documentElements.visibility.innerText = `${weather.visibility} км`;
}

function updateMediumCardStatus() {
    let statusUpdater = new StatusUpdater();
    statusUpdater.updateVisibility(documentElements.visibility.innerText);
    statusUpdater.updateHumidity(documentElements.humidity);
    statusUpdater.updateUvIndex(documentElements.uvIndex);
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
        documentElements.tempUnit.forEach((elem) => {
            elem.innerText = `°${unit.toUpperCase()}`;
        });
        if (unit === "c") {
            documentElements.celsiusBtn.classList.add("active");
            documentElements.fahrenheitBtn.classList.remove("active");
        } else {
            documentElements.celsiusBtn.classList.remove("active");
            documentElements.fahrenheitBtn.classList.add("active");
        }
        changeWeatherData(currentCity, currentUnit, hourlyOrWeek);
    }
}

function changeHourlyOrWeek(unit) {
    if (hourlyOrWeek !== unit) {
        hourlyOrWeek = unit;
        if (unit === "hourly") {
            documentElements.hourlyBtn.classList.add("active");
            documentElements.weekBtn.classList.remove("active");
        } else {
            documentElements.hourlyBtn.classList.remove("active");
            documentElements.weekBtn.classList.add("active");
        }
        changeWeatherData(currentCity, currentUnit, hourlyOrWeek);
    }
}

function celsiusToFahrenheit(temp) {
    return ((temp * 9) / 5 + 32).toFixed(1);
}

documentElements.fahrenheitBtn.addEventListener("click", () => {
    changeUnit("f");
});

documentElements.celsiusBtn.addEventListener("click", () => {
    changeUnit("c");
});

documentElements.hourlyBtn.addEventListener("click", () => {
    changeHourlyOrWeek("hourly");
});

documentElements.weekBtn.addEventListener("click", () => {
    changeHourlyOrWeek("week");
});


getPublicIp();
