/**
 * formatDate
 * @description Given a timestamp input, returns a date in format MM/DD/YYYY
 */

export function formatDate (dateTime) {
  let date = new Date(dateTime);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return (date = mm + '/' + dd + '/' + yyyy);
}
