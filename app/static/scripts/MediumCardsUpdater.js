import {StatusMediumCardsUpdater} from "./StatusMediumCardsUpdater.js";
import {DocumentElements} from "./DocumentElements.js";

let documentElements = new DocumentElements();


export class MediumCardsUpdater{
    UpdateData(weather) {
        let statusUpdater = new StatusMediumCardsUpdater();
        documentElements.uvIndex.innerText = `${weather.uvIndex}`;
        let windSpeed = weather.windSpeed / 3.6;
        documentElements.feelsLike.innerText = `${weather.feelsLike}`;
        documentElements.windSpeed.innerText = `${Math.round(windSpeed)} м/с`;
        documentElements.humidity.innerText = `${weather.humidity} %`;
        documentElements.visibility.innerText = `${weather.visibility} км`;
        documentElements.airQualityStatus.innerText = `${weather.airQualityStatus}`;
        statusUpdater.updateAirQuality(weather.airQualityStatus);
        statusUpdater.updateVisibility(weather.visibility);
        statusUpdater.updateHumidity(weather.humidity);
        statusUpdater.updateUvIndex(weather.uvIndex);
        statusUpdater.updateWindSpeed(windSpeed);
    }
}