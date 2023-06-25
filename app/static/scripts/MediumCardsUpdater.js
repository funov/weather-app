import {StatusMediumCardsUpdater} from "./StatusMediumCardsUpdater.js";
import {DocumentElements} from "./DocumentElements.js";

let documentElements = new DocumentElements();
let statusUpdater = new StatusMediumCardsUpdater();

export class MediumCardsUpdater{
    UpdateData(weather) {
        this.UpdateWindSpeed(weather, documentElements.windSpeed, documentElements.windSpeedStatus);
        this.UpdateHumidity(weather, documentElements.humidity, documentElements.humidityStatus);
        this.UpdateUvIndex(weather, documentElements.uvIndex, documentElements.uvIndexStatus);
        this.UpdateVisibility(weather, documentElements.visibility, documentElements.visibilityStatus);
        this.UpdateWindSpeed(weather, documentElements.windSpeedMobile, documentElements.windSpeedStatusMobile);
        this.UpdateHumidity(weather, documentElements.humidityMobile, documentElements.humidityStatusMobile);
        this.UpdateUvIndex(weather, documentElements.uvIndexMobile, documentElements.uvIndexStatusMobile);
        this.UpdateVisibility(weather, documentElements.visibilityMobile, documentElements.visibilityStatusMobile);
        this.UpdateAirQuality(weather, documentElements.airQuality, documentElements.airQualityStatus);
        this.UpdateAirQuality(weather, documentElements.airQualityMobile, documentElements.airQualityStatusMobile);
        this.UpdateFeelsLike(weather, documentElements.feelsLike);
        this.UpdateFeelsLike(weather, documentElements.feelsLikeMobile);
    }

    UpdateWindSpeed(weather, e1, e2){
        let windSpeed = weather.windSpeed / 3.6;
        e1.innerText = `${Math.round(windSpeed)} м/с`;
        statusUpdater.updateWindSpeed(windSpeed, e2);
    }
    UpdateHumidity(weather, e1, e2){
        e1.innerText = `${weather.humidity} %`;
        statusUpdater.updateHumidity(weather.humidity, e2);
    }
    UpdateVisibility(weather, e1, e2){
        e1.innerText = `${weather.visibility} км`;
        statusUpdater.updateVisibility(weather.visibility, e2);
    }

    UpdateUvIndex(weather, e1, e2){
        e1.innerText = weather.uvIndex;
        statusUpdater.updateUvIndex(weather.uvIndex, e2);
    }
    UpdateAirQuality(weather, e1, e2){
        e1.innerText = weather.airQuality;
        statusUpdater.updateAirQuality(weather.airQuality, e2);
    }
    UpdateFeelsLike(weather, e){
        e.innerText = weather.feelsLike;
    }
}