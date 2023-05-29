export class DateTimeUpdater {
    constructor() {
        this.hour = '';
        this.minute = '';
        this.dayString = '';
    }

    getDateTime() {
        let now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes();

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
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        this.hour = hour;
        this.minute = minute;
        this.dayString = days[now.getDay()];
        return `${this.dayString}, ${this.hour}:${this.minute}`;
    }

    getMinute(){
        return this.minute;
    }
}
