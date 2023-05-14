const root = document.getElementById("root");
const popup = document.getElementById("popup");
const textInput = document.getElementById("text-input");
const form = document.getElementById("form");

let store = {
    city: "Minsk",
    temperature: 0,
    weatherTime: "00:00 AM",
    isDay: "yes",
    description: "",
    iconId: '01',
    properties: {
        humidity: {},
        windSpeed: {},
        pressure: {},
        feelsLike: {},
        visibility: {},
    },
};

const fetchData = async () => {
    try {
        const response = await fetch(`/api/v1.0/current/${store.city}`);
        let weather = await response.json();
        let isDay = "yes";

        store = {
            ...store,
            city: weather.location,
            temperature: weather.temperature,
            weatherTime: weather.weather_time,
            isDay,
            description: weather.description,
            iconId: weather.icon_id,
            properties: {
                humidity: {
                    title: "humidity", value: `${weather.humidity}%`, icon: "humidity.png",
                }, windSpeed: {
                    title: "wind speed", value: `${weather.wind_speed} km/h`, icon: "wind.png",
                }, pressure: {
                    title: "pressure", value: `${weather.pressure} %`, icon: "gauge.png",
                }, feelsLike: {
                    title: "feels like", value: `${weather.temperature_feels_like}`, icon: "uv-index.png",
                }, visibility: {
                    title: "visibility", value: `${weather.visibility}%`, icon: "visibility.png",
                },
            },
        };

        renderComponent();
    } catch (err) {
        console.log(err);
    }
};

const getImage = (description) => {
    const value = description.toLowerCase();

    switch (value) {
        case "partly cloudy":
            return "partly.png";
        case "cloud":
            return "cloud.png";
        case "fog":
            return "fog.png";
        case "sunny":
            return "sunny.png";
        case "cloud":
            return "cloud.png";
        default:
            return "the.png";
    }
};

const renderProperty = (properties) => {
    return Object.values(properties)
        .map(({title, value, icon}) => {
            return `<div class="property">
            <div class="property-icon">
              <img src="./app/static/img/icons/${icon}" alt="">
            </div>
            <div class="property-info">
              <div class="property-info__value">${value}</div>
              <div class="property-info__description">${title}</div>
            </div>
          </div>`;
        })
        .join("");
};

const markup = () => {
    const {city, description, observationTime, temperature, isDay, properties} = store;
    const containerClass = isDay === "yes" ? "is-day" : "";

    return `<div class="container ${containerClass}">
            <div class="top">
              <div class="city">
                <div class="city-subtitle">Weather Today in</div>
                  <div class="city-title" id="city">
                  <span>${city}</span>
                </div>
              </div>
              <div class="city-info">
                <div class="top-left">
                <img class="icon" src="./app/static/img/${getImage(description)}" alt="" />
                <div class="description">${description}</div>
              </div>
            
              <div class="top-right">
                <div class="city-info__subtitle">as of ${observationTime}</div>
                <div class="city-info__title">${temperature}°</div>
              </div>
            </div>
          </div>
        <div id="properties">${renderProperty(properties)}</div>
      </div>`;
};

const togglePopupClass = () => {
    popup.classList.toggle("active");
};

const renderComponent = () => {
    root.innerHTML = markup();

    const city = document.getElementById("city");
    city.addEventListener("click", togglePopupClass);
};

const handleInput = (e) => {
    store = {
        ...store, city: e.target.value,
    };
};

const handleSubmit = (e) => {
    e.preventDefault();
    const value = store.city;

    if (!value) return null;

    localStorage.setItem("query", value);
    fetchData();
    togglePopupClass();
};

form.addEventListener("submit", handleSubmit);
textInput.addEventListener("input", handleInput);

fetchData();