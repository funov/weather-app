import {DocumentElements} from './DocumentElements.js';
import {
    changeWeatherData,
    currentState
} from "./index.js";

let documentElements = new DocumentElements();

export class UnitUpdater {
    changeUnit(unit) {
        if (currentState.currentUnit !== unit) {
            currentState.currentUnit = unit;
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
            if (currentState.type === 'coordinates')
                changeWeatherData(currentState.type, currentState.currentUnit,
                    currentState.hourlyOrWeek, currentState.lat, currentState.lon);
            else {
                changeWeatherData(currentState.type, currentState.currentUnit, currentState.hourlyOrWeek, currentState.currentCity)
            }
        }
    }

    celsiusToFahrenheit(temp) {
        return Math.round((temp * 9) / 5 + 32);
    }
}