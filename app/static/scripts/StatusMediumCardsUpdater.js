export class StatusMediumCardsUpdater {
    updateUvIndex(uvIndex, elem) {
        let status;
        if (uvIndex <= 2) {
            status = "Низкий";
        } else if (uvIndex <= 5) {
            status = "Умеренный";
        } else if (uvIndex <= 7) {
            status = "Высокий";
        } else if (uvIndex <= 10) {
            status = "Очень высокий";
        } else {
            status = "Крайне высокий";
        }
        elem.innerText = status;
    }

    updateHumidity(humidity, elem) {
        let status;
        if (humidity <= 30) {
            status = "Очень сухой воздух";
        } else if (humidity < 55) {
            status = "Сухой воздух";
        } else if (humidity < 70) {
            status = "Умеренно сухой воздух";
        } else if (humidity < 85) {
            status = "Умеренно влажный воздух";
        } else {
            status = "Очень влажный воздух";
        }
        elem.innerText = status;
    }

    updateVisibility(visibility, elem) {
        let status;
        if (visibility <= 0.5) {
            status = "Густой туман";
        } else if (visibility < 1) {
            status = "Туман";
        } else if (visibility < 10) {
            status = "Дымка";
        } else {
            status = "Совершенно ясно";
        }
        elem.innerText = status;
    }

    updateWindSpeed(windSpeed, elem) {
        let status;
        if (windSpeed <= 0.2) {
            status = "Штиль";
        } else if (windSpeed <= 1.5) {
            status = "Тихий ветер";
        } else if (windSpeed <= 3.3) {
            status = "Легкий ветер";
        } else if (windSpeed <= 5.4) {
            status = "Слабый ветер";
        } else if (windSpeed <= 10.7) {
            status = "Свежий ветер";
        } else if (windSpeed <= 13.8) {
            status = "Сильный ветер";
        } else if (windSpeed <= 17.1) {
            status = "Крепкий ветер";
        } else if (windSpeed <= 20.7) {
            status = "Очень крепкий ветер";
        } else if (windSpeed <= 24.4) {
            status = "Шторм";
        } else if (windSpeed <= 28.4) {
            status = "Сильный шторм";
        } else if (windSpeed <= 32.6) {
            status = "Жестокий шторм";
        } else {
            status = "Ураган";
        }
        elem.innerText = status;
    }

    updateAirQuality(airQuality, elem) {
        let status;
        if (airQuality <= 50) {
            status = "Хорошо";
        } else if (airQuality <= 100) {
            status = "Умеренно";
        } else if (airQuality <= 150) {
            status = "Вредно для чувствительных людей";
        } else if (airQuality <= 200) {
            status = "Вредно";
        } else if (airQuality <= 300) {
            status = "Очень вредно";
        } else {
            status = "Опасно";
        }
        elem.innerText = status;
    }
}
