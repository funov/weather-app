document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    await fetchWeatherData(city);
});

async function fetchWeatherData(location) {
    const response = await fetch(`/api/v1.0/current/${location}`);
    const data = await response.json();

    if (response.ok) {
        displayWeatherData(data);
    } else {
        displayWeatherErr(data['detail']);
    }
}

function displayWeatherData(data) {
    const {
        current: {
            cloudcover,
            temperature,
            humidity,
            observation_time: observationTime,
            pressure,
            uv_index: uvIndex,
            visibility,
            is_day: isDay,
            weather_descriptions: description,
            wind_speed: windSpeed,
        },
        location: {name},
    } = data;


    document.getElementById('location').innerText = data.location;
    document.getElementById('temperature').innerText = `Температура ${data.temperature}°C`;
    document.getElementById('description').innerText = data.description;
    document.getElementById('icon_id').innerText = `${data.icon_id} код картинки, чтобы выкачать потом его🤩🤩`;//
    document.getElementById('humidity').innerText = `Влажность ${data.humidity}%`;
    document.getElementById('pressure').innerText = `Давление ${data.pressure}%`;
    document.getElementById('visibility').innerText = `Видно ${data.visibility} м.`;
    document.getElementById('temperature_feels_like').innerText = `Ощущается ${data.temperature_feels_like}°C`;
    document.getElementById('wind_speed').innerText = `Скорость ветра ${data.wind_speed} м./с.`;
    document.getElementById('weatherDisplay').style.display = 'block';
}

function displayWeatherErr(error_message) {
    document.getElementById('location').innerText = error_message;
    document.getElementById('weatherDisplay').style.display = 'block';
}

/////////////

const root = document.getElementById("root");
const popup = document.getElementById("popup");
const textInput = document.getElementById("text-input");
let store = {};


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
              <img src="./img/icons/${icon}" alt="">
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
    const {
        city,
        description,
        observationTime,
        temperature,
        isDay,
        properties
    } = store;
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
                <img class="icon" src="./img/${getImage(description)}" alt="" />
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
        ...store,
        city: e.target.value,
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

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    let city = document.getElementById('city').value;
    store = await fetch(`/api/v1.0/current/${location}`);
    renderComponent()
});


fetchData();