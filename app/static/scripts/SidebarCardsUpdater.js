export class SidebarCardsUpdater {
    UpdateData() {
        let MscUpdater = new SidebarCardUpdater('Moscow', 'Msc');
        let SpbUpdater = new SidebarCardUpdater('Saint Petersburg', 'Spb');
        let EkbUpdater = new SidebarCardUpdater('Yekaterinburg', 'Ekb');
        MscUpdater.UpdateCard();
        SpbUpdater.UpdateCard();
        EkbUpdater.UpdateCard();
    }
}

class SidebarCardUpdater {
    constructor(city, id) {
        this.id = id;
        this.url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`;
    }

    async UpdateCard() {
        fetch(this.url,
            {
                method: "GET",
                headers: {},
            })
            .then((response) => response.json())
            .then((data) => {
                let weather = data.currentConditions;
                let time = weather.datetime.split(':');
                let hours = time[0];
                let minutes = time[1];
                let temp = weather.temp;
                let minTemp = data.days[0].tempmin;
                let maxTemp = data.days[0].tempmax;
                document.getElementById(`${this.id}Date`).innerText = `${hours}:${minutes}`;
                document.getElementById(`${this.id}Temp`).innerText = temp;
                document.getElementById(`${this.id}Max`).innerText = maxTemp;
                document.getElementById(`${this.id}Min`).innerText = minTemp;
                // setInterval(() => {
                //     document.getElementById(`${this.city}Date`).innerText = ;
                // }, 1000);
            })
            .catch((err) => {
                alert(err);
            });
    }
}