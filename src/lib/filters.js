/**
 * findFilterById
 * @description Looks in a list of filters for one matching the ID
 */
export function findFilterById (filters = [], id) {
  return filters.find(filter => filter.id === id);
}
