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
            changeWeatherData(currentState.currentCity, currentState.currentUnit, currentState.hourlyOrWeek);
        }
    }

    celsiusToFahrenheit(temp) {
        return ((temp * 9) / 5 + 32).toFixed(1);
    }
}