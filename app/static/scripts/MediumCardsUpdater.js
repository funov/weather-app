import {StatusMediumCardsUpdater} from "./StatusMediumCardsUpdater.js";
import {DocumentElements} from "./DocumentElements.js";

let documentElements = new DocumentElements();

export class MediumCardsUpdater{
    UpdateData(weather) {
        let statusUpdater = new StatusMediumCardsUpdater();
        documentElements.uvIndex.innerText = weather.uvindex;
        documentElements.windSpeed.innerText = `${Math.round(weather.windspeed / 3.6)} м/с`;
        documentElements.humidity.innerText = `${weather.humidity} %`;
        documentElements.visibility.innerText = `${weather.visibility} км`;
        statusUpdater.updateVisibility(weather.visibility);
        statusUpdater.updateHumidity(weather.humidity);
        statusUpdater.updateUvIndex(weather.uvindex);
    }
}