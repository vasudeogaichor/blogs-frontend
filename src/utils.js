const moment = require('moment');

export function formatDateTime(dateString) {
    const date = moment(dateString);
    const formattedDate = date.format('MMMM DD, YYYY, h:mm:ss A');
    return formattedDate
}