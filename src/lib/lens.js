import { geocodePlacename } from './search';
import { resolveMostRecent } from './request';

/**
 * resolveLensAutocomplete
 * @description Async function used to fetch autocomplete results for SearchBox component
 */

export async function resolveLensAutocomplete (query) {
  const response = await resolveMostRecent(geocodePlacename(query));

  const { candidates = [] } = response;

  return candidates.map(mapGeocodeCandidates);
}

/**
 * mapGeocodeCandidates
 * @description Function that takes a given candidate and returns usable result object
 */

export function mapGeocodeCandidates ({ address, location } = {}) {
  return {
    label: address,
    sublabel: `Location: ${location.x}, ${location.y}`,
    value: location
  };
}
