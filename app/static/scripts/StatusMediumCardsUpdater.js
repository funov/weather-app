import {DocumentElements} from "./DocumentElements.js";

let documentElements = new DocumentElements();

export class StatusMediumCardsUpdater {
    updateUvIndex(uvIndex) {
        let status;
        switch (uvIndex) {
            case uvIndex <= 2:
                status = "Низкий";
                break;
            case uvIndex <= 5:
                status = "Умеренный";
                break;
            case uvIndex <= 7:
                status = "Высокий";
                break;
            case uvIndex <= 10:
                status = "Очень высокий";
                break;
            default:
                status = "Крайне высокий";
        }
        documentElements.uvIndexStatus.innerText = status;
    }

    updateHumidity(humidity) {
        let status;
        switch (humidity) {
            case humidity <= 30:
                status = "Очень сухой воздух";
                break;
            case humidity < 55:
                status = "Сухой воздух";
                break;
            case humidity < 70:
                status = "Умеренно сухой воздух";
                break;
            case humidity < 85:
                status = "Умеренно влажный воздух";
                break;
            default:
                status = "Очень влажный воздух";
                break
        }
        documentElements.humidityStatus.innerText = status;
    }

    updateVisibility(visibility) {
        let status;
        switch (visibility) {
            case visibility <= 0.5:
                status = "Густой туман";
                break;
            case visibility < 1:
                status = "Туман";
                break;
            case visibility < 10:
                status = "Дымка";
                break;
            default:
                status = "Совершенно ясно";
        }
        documentElements.visibilityStatus.innerText = status;
    }

    updateWindSpeed(windSpeed) {
        let status;
        switch (windSpeed) {
            case windSpeed <= 0.2:
                status = "Штиль";
                break;
            case windSpeed <= 1.5:
                status = "Тихий ветер";
                break;
            case windSpeed <= 3.3:
                status = "Легкий ветер";
                break;
            case windSpeed <= 5.4:
                status = "Слабый ветер";
                break;
            case windSpeed <= 10.7:
                status = "Свежий ветер";
                break;
            case windSpeed <= 13.8:
                status = "Сильный ветер";
                break;
            case windSpeed <= 17.1:
                status = "Крепкий ветер";
                break;
            case windSpeed <= 20.7:
                status = "Очень крепкий ветер";
                break;
            case windSpeed <= 24.4:
                status = "Шторм";
                break;
            case windSpeed <= 28.4:
                status = "Сильный шторм";
                break;
            case windSpeed <= 32.6:
                status = "Жестокий шторм";
                break;
            default:
                status = "Ураган";
        }
        documentElements.windSpeedStatus.innerText = status;
    }

    updateAirQuality(airQuality) {
        let status;
        switch (airQuality) {
            case airQuality <= 50:
                status = "Хорошо";
                break;
            case airQuality <= 100:
                status = "Умеренно";
                break;
            case airQuality <= 150:
                status = "Вредно для чувствительных людей";
                break;
            case airQuality <= 200:
                status = "Вредно";
                break;
            case airQuality <= 300:
                status = "Очень вредно";
                break;
            default:
                status = "Опасно";
        }
        documentElements.airQualityStatus.innerText = status;
    }
}
