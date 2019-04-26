import { useState } from 'react';

import { geocodePlacename } from '../lib/leaflet';

export default function useAtlas ({ defaultCenter = {} }) {
  const [mapPosition, updateMapPosition] = useState(defaultCenter);

  return {
    mapPosition,
    updateMapPosition,
    resolveAtlasAutocomplete
  };
}

/**
 * resolveAtlasAutocomplete
 * @description Async function used to fetch autocomplete results for SearchBox component
 */

async function resolveAtlasAutocomplete (query) {
  let geocode;

  try {
    geocode = await geocodePlacename(query);
  } catch (e) {
    throw new Error(`Failed to geocode placename: ${e}`);
  }

  const { candidates = [] } = geocode;

  return candidates.map(mapGeocodeCandidates);
}

/**
 * mapGeocodeCandidates
 * @description Function that takes a given candidate and returns usable result object
 */

function mapGeocodeCandidates ({ address, location } = {}) {
  return {
    label: address,
    sublabel: `Location: ${location.x}, ${location.y}`,
    value: location
  };
}
