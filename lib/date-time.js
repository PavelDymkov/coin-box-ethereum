module.exports = class DateTime {
    static fromTimeString(source) {
        if (typeof source != "string")
            throw new TypeError(`argument is not a string`);

        let [hours, minutes, seconds = 0] = source.split(":").map(mapToTimeValues);

        return (new DateTime).addHours(hours).addMinutes(minutes).addSeconds(seconds);
    }

    static fromDateString(source) {
        if (typeof source != "string")
            throw new TypeError(`argument is not a string`);

        let batches = source.split(".").map(mapToDateValues);

        if (batches.length < 3)
            throw new TypeError("invalid date format");

        let [day, month, year] = batches;

        let date = new Date(year, month - 1, day);

        if (
            date.getDate() != day ||
            date.getMonth() != month - 1 ||
            date.getFullYear() != year
            ) throw new TypeError("invalid date format");

        let dateTime = new DateTime;

        dateTime.value = date.valueOf() / 1000;

        return dateTime;
    }

    static fromString(source) {
        if (typeof source != "string")
            throw new TypeError(`argument is not a string`);

        let batches = source.match(/(\d{1,2}\.\d{1,2}\.\d{4})\D+(\d{1,2}:\d{1,2}:\d{1,2}|\d{1,2}:\d{1,2})/);

        if (!batches)
            throw new TypeError("invalid format");

        let [, dateSource, timeSource] = batches;

        let date = DateTime.fromDateString(dateSource);
        let time = DateTime.fromTimeString(timeSource);

        return new DateTime(date.value + time.value);
    }


    constructor(seconds) {
        // TODO: use BigInt
        this.value = seconds | 0;
    }


    getTime() {
        let time = new Date(this.value * 1000);
        let timeArray = [time.getHours(), time.getMinutes(), time.getSeconds()];

        timeArray.toString = timeArrayToString;

        return timeArray;
    }

    getDate() {
        let date = new Date(this.value * 1000);
        let dateArray = [date.getDate(), date.getMonth(), date.getFullYear()];

        dateArray.toString = dateArrayToString;
        
        return dateArray
    }


    addSeconds(seconds) {
        return new DateTime(this.value + seconds);
    }

    subtractSeconds(seconds) {
        return new DateTime(this.value - seconds);
    }

    addMinutes(minutes) {
        return this.addSeconds(minutes * 60);
    }

    subtractMinutes(minutes) {
        return this.subtractSeconds(minutes * 60);
    }

    addHours(hours) {
        return this.addMinutes(hours * 60);
    }

    subtractHours(hours) {
        return this.subtractMinutes(hours * 60);
    }

    addDays(days) {
        return this.addHours(days * 24);
    }

    subtractDays(days) {
        return this.subtractHours(days * 24);
    }

    addWeeks(weeks) {
        return this.addDays(weeks * 7);
    }

    subtractWeeks(weeks) {
        return this.subtractDays(weeks * 7);
    }

    addYears(years) {
        let date = new Date(this.value * 1000);

        date.setFullYear(date.getFullYear() + years);

        return new DateTime(date.valueOf() / 1000);
    }

    subtractYears(years) {
        return this.addYears(-years);
    }


    valueOf() {
        return this.value;
    }

    toString() {
        return `${this.getTime().toString()} ${this.getDate().toString()}`
    }
}

function addZero(number) {
    return number > 9 ? String(number) : `0${number}`;
}

function timeArrayToString() {
    return this.map(addZero).join(":");
}

function dateArrayToString() {
    return this.map(addZero).join(".");
}

function mapToTimeValues(source, index) {
    if (index > 2) return null;

    let number = parseInt(source, 10);

    if (isNaN(number) || number < 0)
        throw new TypeError("invalid time format");

    if (index == 0) {
        if (number > 23)
            throw new TypeError("invalid time format");

        return number;
    }

    if (index == 1 || index == 2) {
        if (number > 59)
            throw new TypeError("invalid time format");

        return number;
    }
}

function mapToDateValues(source, index) {
    if (index > 2) return null;

    let number = parseInt(source, 10);

    if (isNaN(number) || number < 0)
        throw new TypeError("invalid date format");

    if (index == 0) {
        if (number > 31)
            throw new TypeError("invalid date format");

        return number;
    }

    if (index == 1) {
        if (number > 12)
            throw new TypeError("invalid date format");

        return number;
    }

    if (index == 2) {
        return number;
    }
}
