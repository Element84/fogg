export function findFilterById (filters = [], id) {
  return filters.find(filter => filter.id === id);
}
