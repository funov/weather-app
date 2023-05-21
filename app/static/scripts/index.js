import {statusUpdater} from './StatusUpdater.js';
import {DocumentElements} from './DocumentElements';

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
                DocumentElements.temp.innerText = Math.round(weather.temp);
            } else {
                DocumentElements.temp.innerText = celsiusToFahrenheit(weather.temp);
            }
            DocumentElements.currentLocation.innerText = data.resolvedAddress;
            DocumentElements.description.innerText = weather.conditions;

            DocumentElements.uvIndex.innerText = weather.uvindex;
            DocumentElements.windSpeed.innerText = `${Math.round(weather.windspeed / 3.6)} м/с`;

            // mainIcon.src = getIcon(today.icon); //получение картинки
            // changeBackground(today.icon);
            DocumentElements.humidity.innerText = `${weather.humidity} %`;

            DocumentElements.visibility.innerText = `${weather.visibility} км`;
            updateMediumCardStatus();
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

function updateMediumCardStatus(){
   let statusUpdater = new statusUpdater();
   statusUpdater.updateVisibility(DocumentElements.visibility.innerText);
   statusUpdater.updateHumidity(DocumentElements.humidity);
   statusUpdater.updateUvIndex(DocumentElements.uvIndex);
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
