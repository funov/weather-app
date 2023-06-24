export class StatusMediumCardsUpdater {
    updateUvIndex(uvIndex, elem) {
        let status;
        switch (true) {
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
        elem.innerText = status;
    }

    updateHumidity(humidity, elem) {
        let status = "Очень влажный воздух";
        switch (true) {
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
        }
        elem.innerText = status;
    }

    updateVisibility(visibility, elem) {
        let status = "Совершенно ясно";
        switch (true) {
            case visibility <= 0.5:
                status = "Густой туман";
                break;
            case visibility < 1:
                status = "Туман";
                break;
            case visibility < 10:
                status = "Дымка";
                break;
        }
        elem.innerText = status;
    }

    updateWindSpeed(windSpeed, elem) {
        let status = "Ураган";
        switch (true) {
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
        }
        elem.innerText = status;
    }

    updateAirQuality(airQuality, elem) {
        let status = "Опасно";
        switch (true) {
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
        }
        elem.innerText = status;
    }
}
