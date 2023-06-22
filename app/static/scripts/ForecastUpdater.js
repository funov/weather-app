import {DocumentElements} from './DocumentElements.js';
import {
    changeWeatherData,
    getIcon,
    currentState
} from "./index.js";
import {UnitUpdater} from "./UnitUpdater.js";

let documentElements = new DocumentElements();
let unitUpdater = new UnitUpdater();


export class ForecastUpdater {
    renderForecastCards(data, unit, type) {
        documentElements.weatherCards.innerHTML = "";
        let day = 0;
        let numCards;
        if (type === "hourly") {
            numCards = 24;
        } else {
            numCards = 7;
        }

        for (let i = 0; i < numCards; i++) {
            let card = document.createElement("div");
            card.classList.add("card");
            let dayName = this.getHour(data[day].datetime);
            if (type === "week") {
                dayName = this.getDayName(data[day].datetime);
            }
            let dayTemp = Math.round(data[day].temp);
            if (unit === "f") {
                dayTemp = unitUpdater.celsiusToFahrenheit(data[day].temp);
            }
            let iconCondition = data[day].icon;
            let iconSrc = getIcon(iconCondition);
            let tempUnit = "°C";
            if (unit === "f") {
                tempUnit = "°F";
            }
            card.innerHTML = `
                    <h2 class="day-name">${dayName}</h2>
                <div class="card-icon">
                    <img src="${iconSrc}" class="day-icon" alt="" />
                </div>
                <div class="day-temp">
                  <h2 class="temp">${dayTemp}</h2>
                  <span class="temp-unit">${tempUnit}</span>
                </div>`;
            documentElements.weatherCards.appendChild(card);
            day++;
        }
    }

    changeForecast(unit) {
        if (currentState.hourlyOrWeek !== unit) {
            currentState.hourlyOrWeek = unit;
            if (unit === "hourly") {
                documentElements.hourlyBtn.classList.add("active");
                documentElements.weekBtn.classList.remove("active");
            } else {
                documentElements.hourlyBtn.classList.remove("active");
                documentElements.weekBtn.classList.add("active");
            }
            changeWeatherData(currentState.currentCity, currentState.currentUnit, currentState.hourlyOrWeek);
        }
    }

    getHour(time) {
        let hour = time.split(":")[0];
        let min = time.split(":")[1];

        return `${hour}:${min}`;
    }

    getDayName(date) {
        let day = new Date(date);
        let days = [
            "Вс",
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб",
        ];
        return days[day.getDay()];
    }
}