export class DateTimeUpdater {
    getDateTime() {
        let now = new Date(),
            hour = now.getHours(),
            minute = now.getMinutes();

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
        let dayString = days[now.getDay()];
        return `${dayString}, ${hour}:${minute}`;
    }
}
