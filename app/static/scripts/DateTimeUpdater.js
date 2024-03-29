export class DateTimeUpdater {
    constructor() {
        this.hour = '';
        this.minute = '';
        this.dayString = '';
    }

    convertTimeToTimeZone(timezone) {
        let date = new Date();
        let options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
            timeZone: timezone
        };
        return date.toLocaleTimeString(undefined, options);
    }

    calculateDateTimeByTimezone(timezone){
        let convertedTime = this.convertTimeToTimeZone(timezone);
        this.hour = convertedTime.split(':')[0];
        this.minute = convertedTime.split(':')[1];

        let days = [
            "Воскресенье",
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
        ];
        this.dayString = days[new Date().getDay()];
    }

    getDateTimeByTimezone(timezone) {
        this.calculateDateTimeByTimezone(timezone)
        return `${this.dayString}, ${this.hour}:${this.minute}`;
    }

    getTimeByTimezone(timezone){
        this.calculateDateTimeByTimezone(timezone)
        return `${this.hour}:${this.minute}`;
    }
}
