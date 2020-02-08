import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en);
const timeAgoFormatter = new TimeAgo('en-US');

export function timeAgo(dateString) {
    return timeAgoFormatter.format(Date.parse(dateString))
}
