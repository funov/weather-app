export class statusUpdater {
    updateUvIndex(uvIndex) {
        if (uvIndex <= 2) {
            uvText.innerText = "Низкий";
        } else if (uvIndex <= 5) {
            uvText.innerText = "Умеренный";
        } else if (uvIndex <= 7) {
            uvText.innerText = "Высокий";
        } else if (uvIndex <= 10) {
            uvText.innerText = "Очень высокий";
        } else {
            uvText.innerText = "Крайне высокий";
        }
    }
    updateHumidity(humidity) {
        if (humidity <= 30) {
            humidityStatus.innerText = "Очень сухой воздух";
        } else if (humidity < 55) {
            humidityStatus.innerText = "Сухой воздух";
        } else if (humidity < 70) {
            humidityStatus.innerText = "Умеренно сухой воздух";
        } else if (humidity < 85) {
            humidityStatus.innerText = "Умеренно влажный воздух";
        } else {
            humidityStatus.innerText = "Очень влажный воздух";
        }
    }
    updateVisibility(visibility) {
        if (visibility <= 0.5) {
            visibilityStatus.innerText = "Густой туман";
        } else if (visibility < 1) {
            visibilityStatus.innerText = "Туман";
        } else if (visibility < 10) {
            visibilityStatus.innerText = "Дымка";
        } else {
            visibilityStatus.innerText = "Совершенно ясно";
        }
    }
}
