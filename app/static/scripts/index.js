import {DocumentElements} from './DocumentElements.js';
import {UnitUpdater} from "./UnitUpdater.js";
import {ForecastUpdater} from "./ForecastUpdater.js";
import {DateTimeUpdater} from "./DateTimeUpdater.js";
import {SidebarDataUpdater} from "./SidebarDataUpdater.js";
import {MediumCardsUpdater} from "./MediumCardsUpdater.js";
import {Geolocator} from "./Geolocator.js";
import {CurrentState} from "./CurrentState.js";
import {SidebarCardsUpdater} from "./SidebarCardsUpdater.js";
import {BackgroundUpdater} from "./BackgroundUpdater.js";


export let currentState = new CurrentState();
let documentElements = new DocumentElements();
let unitUpdater = new UnitUpdater();
let forecastUpdater = new ForecastUpdater();
let dateTimeUpdater = new DateTimeUpdater();
let sidebarDataUpdater = new SidebarDataUpdater();
let mediumCardsUpdater = new MediumCardsUpdater();
let geolocator = new Geolocator();
let sidebarCardsUpdater = new SidebarCardsUpdater();
let backgroundUpdater = new BackgroundUpdater();


export let changeWeatherData = (city, unit, hourlyOrWeek) => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&lang=ru&key=KH9Z3HUWAP52MDB7LBFC88FH5&contentType=json`,
        {
            method: "GET",
            headers: {},
        })
        .then((response) => response.json())
        .then((data) => {
            let currentConditions = data.currentConditions;
            forecastUpdater.createCards(data.days[0].hours, 'c', "hourly", documentElements.todayCards,true);
            forecastUpdater.createCards(data.days, 'c', 'week', documentElements.weekCards,true);

            sidebarCardsUpdater.UpdateData();
            mediumCardsUpdater.UpdateData(currentConditions, documentElements.mediumCardsMobile);
            mediumCardsUpdater.UpdateData(currentConditions, documentElements.mediumCards);
            if (hourlyOrWeek === "hourly") {
                forecastUpdater.renderForecastCards(data.days[0].hours, unit, hourlyOrWeek);
            } else {
                forecastUpdater.renderForecastCards(data.days, unit, hourlyOrWeek);
            }

            sidebarDataUpdater.updateData(data, currentConditions, unit);
            currentState.timezone = data['timezone'];
            documentElements.date.innerText = dateTimeUpdater.getDateTimeByTimezone(currentState.timezone);
            backgroundUpdater.UpdateBackground(dateTimeUpdater.hour);
        })
        .catch((err) => {
            alert(err);
        });
}

export function getIcon(condition) {
    if (condition === "partly-cloudy-day") {
        return "https://i.ibb.co/PZQXH8V/27.png";
    } else if (condition === "partly-cloudy-night") {
        return "https://i.ibb.co/Kzkk59k/15.png";
    } else if (condition === "rain") {
        return "https://i.ibb.co/kBd2NTS/39.png";
    } else if (condition === "clear-day") {
        return "https://i.ibb.co/rb4rrJL/26.png";
    } else if (condition === "clear-night") {
        return "https://i.ibb.co/1nxNGHL/10.png";
    } else {
        return "https://i.ibb.co/rb4rrJL/26.png";
    }
}

documentElements.fahrenheitBtn.addEventListener("click", () => {
    unitUpdater.changeUnit("f");
});

documentElements.celsiusBtn.addEventListener("click", () => {
    unitUpdater.changeUnit("c");
});

documentElements.hourlyBtn.addEventListener("click", () => {
    forecastUpdater.changeForecast("hourly");
});

documentElements.weekBtn.addEventListener("click", () => {
    forecastUpdater.changeForecast("week");
});

documentElements.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let location = documentElements.search.value;
    if (location) {
        currentState.currentCity = location;
        changeWeatherData(location, currentState.currentUnit, currentState.hourlyOrWeek);
    }
});

setInterval(() => {
    documentElements.date.innerText = dateTimeUpdater.getDateTimeByTimezone(currentState.timezone);
}, 1000);


document.querySelectorAll('.sidebar-cards button')
    .forEach(b => b.addEventListener('click', getValue));


function getValue(e) {
    changeWeatherData(this.value, currentState.currentUnit, currentState.hourlyOrWeek);
}


geolocator.defineLocationByLatLon();
