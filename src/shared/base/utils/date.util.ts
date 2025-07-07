export default class DateUtil {
    static convert(dateStr: string): Date {
        const date = new Date(dateStr);
        date.setDate(date.getDate() + 1);
        return date;
    }

    static addDays(date: Date, days: number): Date {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    static addMinutes(date: Date, minutes: number): Date {
        var result = new Date(date);
        result.setMinutes(result.getMinutes() + minutes);
        return result;
    }

    static dateToStringBr(date: Date): string {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return `${day}/${month}/${year}`;
    }

    static dateToStringBrYMD(date: Date): string {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return `${year}/${month}/${day}`;
    }

    static dateToString(date: Date): string {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    static getDifferenceInDays(startDate: Date, endDate: Date) {
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
    }

    static parseDateString(dateString: string): Date { // yyyy-MM-dd HH:mm
        const [datePart, timePart] = dateString.split(' ');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);

        return new Date(year, month - 1, day, hours, minutes);
    }

    static parseDateStringUTC(dateString: string): Date {

        const [datePart, timePart] = dateString.split(' ');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);

        const localDate = new Date(year, month - 1, day, hours, minutes);

        const utcDate = new Date(localDate.getTime() - (-3 * 60 * 60 * 1000));

        return utcDate;
    }
}