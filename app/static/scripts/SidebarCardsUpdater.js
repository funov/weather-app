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
    constructor(city, id, timezone) {
        this.city = city;
        this.timezone = timezone;
        this.id = id;
        this.url = `api/v1.0/now/byLocation?location=${city}&lang=ru&units=metric`;
    }

    async UpdateCard() {
        fetch(this.url,
            {
                method: "GET",
                headers: {},
            })
            .then((response) => response.json())
            .then((data) => {
                let time = dateTimeUpdater.getTimeByTimezone(this.timezone);
                let temp;
                let minTemp;
                let maxTemp;
                if (currentState.currentUnit === "c") {
                    temp = Math.round(data.temperature);
                    minTemp = Math.round(data.temperatureMin);
                    maxTemp = Math.round(data.temperatureMax);
                } else {
                    temp = unitUpdater.celsiusToFahrenheit(data.temperature);
                    minTemp = unitUpdater.celsiusToFahrenheit(data.temperatureMin);
                    maxTemp = unitUpdater.celsiusToFahrenheit(data.temperatureMax);
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