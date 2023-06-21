import {DocumentElements} from './DocumentElements.js';
let documentElements = new DocumentElements();
import {BackgroundUpdater} from "./BackgroundUpdater.js";
let backgroundUpdater = new BackgroundUpdater();

export class DateTimeUpdater {
    constructor() {
        this.hour = '';
        this.minute = '';
        this.dayString = '';
    }

    // updateDateTime() {
    //     this.date.setMinutes(this.date.getMinutes() + 1);
    //     this.changeMinHourView();
    //     return `${this.dayString}, ${this.hour}:${this.minute}`;
    // }

    getDateTimeByTimezone(timezone) {
        console.log(`time before request ${this.hour}, ${this.minute}`)
        this.getRequest(timezone);
        console.log(`time after request ${this.hour}, ${this.minute}`)
        // return `${this.dayString}, ${this.hour}:${this.minute}`;
    }

    getRequest(timezone){
        fetch(`http://worldtimeapi.org/api/timezone/${timezone}`)
            .then(response => response.json())
            .then(data => {
                console.log(timezone);
                let date = data.datetime.split('T')[1].split('.')[0].split(':');
                this.hour = date[0];
                this.minute = date[1];
                console.log(`hour ${this.hour}, min ${this.minute}`);

                let days = [
                    "Воскресенье",
                    "Понедельник",
                    "Вторник",
                    "Среда",
                    "Четверг",
                    "Пятница",
                    "Суббота",
                ];
                this.dayString = days[data.day_of_week];
            })
            .then(() =>{
                documentElements.date.innerText =`${this.dayString}, ${this.hour}:${this.minute}`;
            })
            .then(()=>{
                backgroundUpdater.UpdateBackground(this.getHour());
            })
            .catch(error => console.error(error));
    }

    getHour() {
        return this.hour;
    }
}
