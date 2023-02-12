export class DateUtil {
    static addLeadingZero(input) {
        const thisNum = Number(input);
        if (thisNum < 10) {
            return '0' + input;
        }
        return input;
    }

    static getLocalDateInISOFormat(date) {
        const components = date.split('/');
        const month = this.addLeadingZero(components[0]);
        const day = this.addLeadingZero(components[1]);
        const year = components[2];

        return year + '-' + month + '-' + day;
    }
}
