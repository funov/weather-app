import {DateTimeUpdater} from "./DateTimeUpdater.js";
import {UnitUpdater} from "./UnitUpdater.js";
import {
    currentState
} from "./index.js";

let unitUpdater = new UnitUpdater();
let dateTimeUpdater = new DateTimeUpdater();


export class SidebarCardsUpdater {
    UpdateData() {
        let MscUpdater = new SidebarCardUpdater('Moscow', 'Msc', 'Europe/Moscow');
        let SpbUpdater = new SidebarCardUpdater('Saint Petersburg', 'Spb', 'Europe/Moscow');
        let EkbUpdater = new SidebarCardUpdater('Yekaterinburg', 'Ekb', 'Asia/Yekaterinburg');
        MscUpdater.UpdateCard();
        SpbUpdater.UpdateCard();
        EkbUpdater.UpdateCard();
    }
}

class SidebarCardUpdater {
    //потом буду просто ходить в нашу апи, брать поля из now
    constructor(city, id, timezone) {
        this.city = city;
        this.timezone = timezone;
        this.id = id;
        this.url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`;
    }

    async UpdateCard() {
        fetch(this.url,
            {
                method: "GET",
                headers: {},
            })
            .then((response) => response.json())
            .then((data) => {
                let weather = data.currentConditions;
                let time = dateTimeUpdater.getTimeByTimezone(this.timezone);
                let temp;
                let minTemp;
                let maxTemp;
                if (currentState.currentUnit === "c") {
                    temp = Math.round(weather.temp);
                    minTemp = Math.round(data.days[0].tempmin);
                    maxTemp = Math.round(data.days[0].tempmax);
                } else {
                    temp = unitUpdater.celsiusToFahrenheit(weather.temp);
                    minTemp = unitUpdater.celsiusToFahrenheit(data.days[0].tempmin);
                    maxTemp = unitUpdater.celsiusToFahrenheit(data.days[0].tempmax);
                }
                document.getElementById(`${this.id}Date`).innerText = `${time}`;
                document.getElementById(`${this.id}Temp`).innerText = `${temp}°${currentState.currentUnit.toUpperCase()}`;
                document.getElementById(`${this.id}Max`).innerText =
                    `${maxTemp}°${currentState.currentUnit.toUpperCase()}`;
                document.getElementById(`${this.id}Min`).innerText =
                    `${minTemp}°${currentState.currentUnit.toUpperCase()}`;
                setInterval(() => {
                    document.getElementById(`${this.id}Date`).innerText
                        = dateTimeUpdater.getTimeByTimezone(this.timezone);
                }, 1000);
            })
            .catch((err) => {
                alert(err);
            });
    }
}