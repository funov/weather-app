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
        this.createCards(data, unit, type, documentElements.weatherCards);
    }

    createCards(data, unit, type, elem, mobile=false){
        elem.innerHTML = "";
        // let day = 0;
        let numCards;
        if (type === "hourly") {
            numCards = 24;
        } else {
            numCards = 7;
        }

        for (let i = 0; i < numCards; i++) {
            let card = document.createElement("div");
            card.classList.add("card");
            let dayName;
            let dayTemp;
            let iconCondition;
            if (type === "week") {
                dayName = this.getDayName(data[i].date);
                dayTemp = Math.round(data[i].hours[15].temperature);
                iconCondition = data[i].hours[15].icon;
            }
            else {
                dayName = this.getHour(data.hours[i].hour);
                dayTemp = Math.round(data.hours[i].temperature);
                iconCondition = data.hours[i].icon;
            }
            if (unit === "f") {
                dayTemp = unitUpdater.celsiusToFahrenheit(dayTemp);
            }
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

            elem.appendChild(card);
            if (mobile && i !== numCards - 1){
                let div = document.createElement('div');
                div.classList.add('vert-divider');
                elem.appendChild(div);
            }
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
            if (currentState.type === 'city'){
                changeWeatherData(currentState.type, currentState.currentUnit, currentState.hourlyOrWeek, currentState.currentCity);
            }
            else {
                changeWeatherData(currentState.type, currentState.currentUnit, currentState.hourlyOrWeek, currentState.lat, currentState.lon);
            }
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