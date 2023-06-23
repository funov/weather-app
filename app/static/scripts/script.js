const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        let weather = await response.json();
        console.log(weather);
        return weather;
    } catch (err) {
        console.log(err);
        return null;
    }
};

ymaps.ready(init);
let myMap, myPlacemark;

// TODO °F
function init() {
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64], zoom: 4
    }, {
        searchControlProvider: 'yandex#search', restrictMapArea: [[85, -179], [-85, 180]]
    });

    myMap.cursors.push('pointer');

    myMap.events.add('click', async function (e) {
        let coords = e.get('coords');
        let weather = await fetchData(`/api/v1.0/now/byCoordinates?lat=${coords[0]}&lon=${coords[1]}`).then();
        let balloonContent = `<div class="ymaps-balloon"><p class="ymaps-balloon-text">${weather.temperature}°C</p><img src="app/static/weather_icons/${weather.icon}.png" class="ymaps-balloon-icon"></div>`;

        if (myPlacemark) {
            myMap.geoObjects.remove(myPlacemark);
            myPlacemark = createPlacemark(coords, balloonContent);
            myMap.geoObjects.add(myPlacemark);
        } else {
            myPlacemark = createPlacemark(coords, balloonContent);
            myMap.geoObjects.add(myPlacemark);
        }
    });

    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('zoomControl');
    myMap.controls.remove('rulerControl');
}

function createPlacemark(coords, balloonContent) {
    return new ymaps.Placemark(coords, {
        hintContent: 'Нажми на меня😳', balloonContent: balloonContent
    }, {
        draggable: false
    });
}
