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
        .then((response) => {
            if (!response.ok) {
                alert("Мы не смогли найти твой город. Попробуй искать на английском языке");
                return;
            }

            return response.json()
        })
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
        });
}

export function getIcon(condition) {
    switch (condition) {
        case "snow":
        case "snow-showers-day":
            return "app/static/icons/sun/Snow.png";
        case "snow-showers-night": {
            let random = 2 * Math.random() + Math.random();
            while (random > 2) {
                random = 2 * Math.random() + Math.random();
            }
            if (random === 0)
                return "app/static/icons/moon/SnowShowersNight.png";
            else if (random === 1)
                return "app/static/icons/moon/SnowShowersNight2.png";
            return "app/static/icons/moon/SnowShowersNight3.png";
        }
        case "thunder-rain":
        case "thunder-showers-day":
            return "app/static/icons/sun/ThunderShowersDay.png";
        case "thunder-showers-night": {
            let random = Math.random();
            return random === 0 ? "app/static/icons/moon/ThunderShowersNight.png" : "app/static/icons/moon/ThunderShowersNight2.png";
        }
        case "showers-day":
            return "app/static/icons/sun/ShowersDay.png";
        case "showers-night":
            return "app/static/icons/moon/ShowersNight.png";
        case "fog":
            return "app/static/icons/cloud/Cloudy.png";
        case "wind":
            return "app/static/icons/sun/Wind.png";
        case "cloudy":
            return "app/static/icons/cloud/Cloudy.png";
        case "partly-cloudy-day":
            return "app/static/icons/sun/PartlyCloudyDay.png";
        case "partly-cloudy-night": {
            let random = Math.random();
            return random === 0 ? "app/static/icons/moon/PartlyCloudyNight.png" : "app/static/icons/moon/PartlyCloudyNight2.png";
        }
        case "rain":
            return "app/static/icons/rain/Rain.png";
        case "clear-day":
            return "app/static/icons/sun/ClearDay.png";
        case "clear-night":
            return "app/static/icons/star/ClearNight.png";
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
    } else {
        alert("Мы не смогли найти город с таким названием. Попробуй искать на английском языке.");
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
