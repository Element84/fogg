/**
 * lensDateToSatTime
 * @description Converts an Lens date object to SAT API friendly string
 * @see http://sat-utils.github.io/sat-api/#search-stac-items-by-simple-filtering-
 */

export function lensDateToSatTime ({ start, end } = {}) {
  let dateStart;
  let dateEnd;
  let dateFull;

  if (start) {
    dateStart = new Date(start).toISOString();
  }

  if (end) {
    dateEnd = new Date(end).toISOString();
  }

  // Return either a period of time or
  if (dateStart && dateEnd) {
    dateFull = `${dateStart}/${dateEnd}`;
  } else {
    dateFull = dateStart || dateEnd;
  }

  return dateFull;
}

/**
 * stacHasMoreResults
 * @param {object} meta - Uses the meta data to determine if there are more results
 */

export function stacHasMoreResults ({ page, limit, matched } = {}) {
  if (page * limit < matched) return true;
  return false;
}