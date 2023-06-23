const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        console.log(response)
        let weather = await response.json();
        console.log(weather);
    } catch (err) {
        console.log(err);
    }
};

ymaps.ready(init);
let myMap, myPlacemark;

function init() {
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64], zoom: 4
    }, {
        searchControlProvider: 'yandex#search', restrictMapArea: [[85, -179], [-85, 180]]
    });

    myMap.cursors.push('pointer');

    myMap.events.add('click', async function (e) {
        let coords = e.get('coords');

        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        } else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
        }

        fetchData(`/api/v1.0/now/byCoordinates?lat=${coords[0]}&lon=${coords[1]}`).then();
    });

    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('zoomControl');
    myMap.controls.remove('rulerControl');
}

function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
        hintContent: 'Метка', balloonContent: '☀️ 30°C'
    }, {
        draggable: false
    });
}
