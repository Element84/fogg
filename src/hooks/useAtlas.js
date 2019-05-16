import { useState } from 'react';
import uuidv1 from 'uuid/v1';

import {
  geocodePlacename,
  geoJsonFromLatLn,
  clearLeafletElementLayers,
  addLeafletMarkerLayer
} from '../lib/leaflet';

export default function useAtlas ({
  defaultCenter = {},
  resolveOnSearch,
  refMapDraw
}) {
  const [mapConfig, updateMapConfig] = useState({
    center: defaultCenter,
    textInput: '',
    date: {},
    page: 1
  });
  const [results, updateResults] = useState();

  /**
   * search
   * @description HAndle search functionality given layer settings and a date
   */

  function search ({
    layer = {},
    date = mapConfig.date,
    textInput = mapConfig.textInput,
    page = 1
  }) {
    let { center = mapConfig.center, geoJson } = layer;

    if (typeof geoJson === 'undefined') {
      geoJson = geoJsonFromLatLn(center);
    }

    const mapUpdate = {
      ...mapConfig,
      center,
      geoJson,
      textInput,
      date,
      page
    };

    const params = {
      geoJson,
      date,
      textInput,
      page
    };

    if (typeof resolveOnSearch === 'function') {
      resolveOnSearch(params).then((data = []) => {
        updateResults([...(results || []), ...data]);
      });
    }

    updateMapConfig(mapUpdate);
  }

  /**
   * handleOnSearch
   * @description Fires when a search is performed via SearchComplete
   */

  function handleOnSearch ({ x, y } = {}, date, textInput) {
    if (typeof x === 'undefined' || typeof y === 'undefined') {
      return;
    }

    const center = {
      lng: x,
      lat: y
    };

    addSearchMarker(center);

    search({
      layer: {
        geoJson: geoJsonFromLatLn(center),
        center
      },
      date,
      textInput
    });
  }

  function addSearchMarker (position) {
    const { current } = refMapDraw;
    const { leafletElement } = current || {};
    if (leafletElement) {
      clearLeafletElementLayers(leafletElement);
      addLeafletMarkerLayer(position, leafletElement);
    }
  }

  /**
   * handleOnCreated
   * @description Fires when a layer is created
   */

  function handleOnCreated (layer) {
    search({
      layer
    });
  }

  /**
   * handleLoadMoreResults
   * @description Triggers a new search request with an additional argument for page
   */

  function handleLoadMoreResults () {
    search({
      page: mapConfig.page + 1
    });
  }

  return {
    mapConfig,
    results,
    handlers: {
      handleOnCreated,
      handleOnSearch,
      resolveAtlasAutocomplete,
      loadMoreResults: handleLoadMoreResults
    }
  };
}

/**
 * resolveAtlasAutocomplete
 * @description Async function used to fetch autocomplete results for SearchBox component
 */

let queryCompleteGlobalNonce;
let queryCompleteRequests = [];

async function resolveAtlasAutocomplete (query) {
  // Generate a unique ID and store it as a nonce

  const id = uuidv1();
  const localNonce = (queryCompleteGlobalNonce = id);

  // If this instance of the local nonce doesn't match
  // the global one, it means it's stale, so return

  if (localNonce !== queryCompleteGlobalNonce) return;

  let geocode = geocodePlacename(query);

  // Push the current request into a globally stored
  // variable to allow us to keep track of history

  queryCompleteRequests.push({
    id,
    promise: geocode
  });

  // Run through all previous requests, cancel any thta
  // didn't complete and remove them from the request array

  queryCompleteRequests
    .filter(request => request.id !== id && !request.promise.isCanceled)
    .forEach((request, index) => {
      request.promise.cancel();
      queryCompleteRequests.splice(index, 1);
    });

  try {
    geocode = await geocode;
  } catch (e) {
    // A cancelled request throws an error, so if it's
    // cancelled, catch it and don't consider it one

    if (geocode.isCanceled) return;

    throw new Error(`Failed to geocode placename: ${e}`);
  }

  // Again, if this instance of the request doesn't match the
  // global one, we want to cancel it and return, to avoid
  // updating the application with stale data

  if (localNonce !== queryCompleteGlobalNonce) {
    if (typeof geocode.cancel === 'function') {
      geocode.cancel('Canceling stale geocode placename request');
    }
    return;
  }

  // Finally grab the geocode candidates and return them as our data

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
