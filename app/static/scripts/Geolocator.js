import {
    changeWeatherData,
    currentState
} from "./index.js";

export class Geolocator {
    defineLocationByLatLon() {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                fetch(`api/v1.0/now/byCoordinates?lat=${lat}&lon=${lon}&lang=ru&units=metric`,
                    {
                        method: "GET",
                        headers: {},
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        let timezone = data.timezone;
                        currentState.currentCity = timezone.split('/')[1];
                        changeWeatherData('city', currentState.currentUnit, currentState.hourlyOrWeek,currentState.currentCity);
                    })
                    .catch((err) => {
                        alert(err);
                    });
            },
            function errorCallback(error) {
                alert(error)
            }
        );
    }
}