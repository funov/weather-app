export class DateTimeUpdater {
    constructor() {
        let now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes();
        this.hour = hour;
        this.minute = minute;

        let days = [
            "Воскресенье",
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
        ];

        if (hour < 10) {
            this.hour = "0" + hour;
        }
        if (minute < 10) {
            this.minute = "0" + minute;
        }
        this.dayString = days[now.getDay()];
    }

    getDateTime() {
        return `${this.dayString}, ${this.hour}:${this.minute}`;
    }

    getMinute(){
        return this.minute;
    }
}
