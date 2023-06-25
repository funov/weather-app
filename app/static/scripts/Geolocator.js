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
                fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=us&key=KH9Z3HUWAP52MDB7LBFC88FH5&contentType=json`,
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