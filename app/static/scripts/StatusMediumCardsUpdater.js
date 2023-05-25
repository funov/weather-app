import {DocumentElements} from './DocumentElements.js';

let documentElements = new DocumentElements();

export class StatusMediumCardsUpdater {
    updateUvIndex(uvIndex) {
        if (uvIndex <= 2) {
            documentElements.uvIndexStatus.innerText = "Низкий";
        } else if (uvIndex <= 5) {
            documentElements.uvIndexStatus.innerText = "Умеренный";
        } else if (uvIndex <= 7) {
            documentElements.uvIndexStatus.innerText = "Высокий";
        } else if (uvIndex <= 10) {
            documentElements.uvIndexStatus.innerText = "Очень высокий";
        } else {
            documentElements.uvIndexStatus.innerText = "Крайне высокий";
        }
    }

    updateHumidity(humidity) {
        if (humidity <= 30) {
            documentElements.humidityStatus.innerText = "Очень сухой воздух";
        } else if (humidity < 55) {
            documentElements.humidityStatus.innerText = "Сухой воздух";
        } else if (humidity < 70) {
            documentElements.humidityStatus.innerText = "Умеренно сухой воздух";
        } else if (humidity < 85) {
            documentElements.humidityStatus.innerText = "Умеренно влажный воздух";
        } else {
            documentElements.humidityStatus.innerText = "Очень влажный воздух";
        }
    }

    updateVisibility(visibility) {
        if (visibility <= 0.5) {
            documentElements.visibilityStatus.innerText = "Густой туман";
        } else if (visibility < 1) {
            documentElements.visibilityStatus.innerText = "Туман";
        } else if (visibility < 10) {
            documentElements.visibilityStatus.innerText = "Дымка";
        } else {
            documentElements.visibilityStatus.innerText = "Совершенно ясно";
        }
    }
}
