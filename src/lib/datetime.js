import moment from 'moment';

/**
 * formatDate
 * @description Given a timestamp input, returns a date in format MM/DD/YYYY
 */

export function formatDate (dateTime, defaultValue = '-') {
  if (!dateTime && dateTime !== 0) return defaultValue;

  let date = new Date(dateTime);

  date = moment.utc(moment(date));

  return date.format('MM/DD/YYYY').valueOf();
}

/**
 * formatDateTime
 * @description Given a timestamp input, returns a date in format MM/DD/YYYY HH:MM
 */

export function formatDateTime (dateTime, defaultValue = '-') {
  if (!dateTime && dateTime !== 0) return defaultValue;

  let date = dateTime;

  if (!(date instanceof Date)) {
    date = new Date(dateTime);
  }

  date = moment.utc(moment(date));

  return date.format('MM/DD/YYYY h:mm a');
}

/**
 * formatDuration
 * @description Given a duration in seconds, formats as x days, x minutes, x seconds
 */

export function formatDuration (duration) {
  const momentDuration = moment.duration(duration, 's');
  const time = [];

  const days = momentDuration.days();
  const hours = momentDuration.hours();
  const minutes = momentDuration.minutes();
  const seconds = momentDuration.seconds();

  if (days > 0) time.push(`${days} Day(s)`);
  if (hours > 0) time.push(`${hours} Hour(s)`);
  if (minutes > 0) time.push(`${minutes} Minute(s)`);
  if (seconds > 0) time.push(`${seconds} Second(s)`);

  return time.join(', ');
}

/**
 * formatMapServiceDate
 * @description Given a timestamp input, returns a date in format YYYY-MM-DD
 */
export function formatMapServiceDate (dateTime) {
  if (!dateTime) return;
  let date = new Date(dateTime);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return (date = yyyy + '-' + mm + '-' + dd);
}