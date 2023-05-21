export class DocumentElements {
    temp = document.getElementById("temp");
    date = document.getElementById("date-time");
    description = document.getElementById("description");
    mainIcon = document.getElementById("icon");
    currentLocation = document.getElementById("location");
    uvIndex = document.querySelector(".uvIndex");
    windSpeed = document.querySelector(".wind-speed");
    humidity = document.querySelector(".humidity");
    visibility = document.querySelector(".visibility");
    uvIndexStatus = document.querySelector(".uvIndex-status");
    humidityStatus = document.querySelector(".humidity-status");
    visibilityStatus = document.querySelector(".visibility-status");
    searchForm = document.querySelector("#search");
    search = document.querySelector("#query");
    celsiusBtn = document.querySelector(".celsius");
    fahrenheitBtn = document.querySelector(".fahrenheit");
    tempUnit = document.querySelectorAll(".temp-unit");
    hourlyBtn = document.querySelector(".hourly");
    weekBtn = document.querySelector(".week");
    weatherCards = document.querySelector("#weather-cards");
}
