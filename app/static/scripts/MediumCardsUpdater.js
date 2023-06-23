import {StatusMediumCardsUpdater} from "./StatusMediumCardsUpdater.js";
import {DocumentElements} from "./DocumentElements.js";

let documentElements = new DocumentElements();


export class MediumCardsUpdater{
    UpdateData(weather) {
        let statusUpdater = new StatusMediumCardsUpdater();
        documentElements.uvIndex.innerText = `${weather.uvindex}`;
        let windSpeed = weather.windspeed / 3.6;
        documentElements.feelsLike.innerText = `${weather.feelslike}`;
        documentElements.windSpeed.innerText = `${Math.round(windSpeed)} м/с`;
        documentElements.humidity.innerText = `${weather.humidity}%`;
        documentElements.visibility.innerText = `${weather.visibility} км`;
        documentElements.airQuality.innerText = `${weather.winddir}`;
        statusUpdater.updateAirQuality(weather.winddir);
        statusUpdater.updateVisibility(weather.visibility);
        statusUpdater.updateHumidity(weather.humidity);
        statusUpdater.updateUvIndex(weather.uvindex);
        statusUpdater.updateWindSpeed(windSpeed);
    }
}