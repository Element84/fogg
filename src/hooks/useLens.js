import { useContext } from 'react';

import Logger from '../lib/logger';
import { isValidLeafletElement, currentLeafletRef } from '../lib/leaflet';

import { LensContext } from '../context';

const logger = new Logger('useLens', {
  isBrowser: true
});

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

export default function useLens () {
  const { geoSearch = {}, map = {}, geoFilters = {}, activeDateRange = {} } =
    useContext(LensContext) || {};
  const { search, searchPlacename, updateSearch, clearSearch } = geoSearch;
  const { filters, clearActiveFilters } = geoFilters;
  const {
    refMap,
    draw = {},
    clearLayers,
    resetMapView,
    addShapeToMap,
    mapFeatureGroup
  } = map;
  const { shapeOptions } = draw;

  /**
   * handleSearch
   */

  async function handleSearch (settings = {}, options) {
    const response = await search(
      {
        filters: [...filters.active],
        ...settings
      },
      {
        ...options,
        resolveBeforeSearch: handleResolveBeforeSearch
      }
    );
    return response;
  }

  /**
   * handleSearchPlacename
   */

  async function handleSearchPlacename (settings = {}, options) {
    const response = await searchPlacename(
      {
        filters: [...filters.active],
        ...settings
      },
      {
        ...options,
        resolveBeforeSearch: handleResolveBeforeSearch
      }
    );
    return response;
  }

  /**
   * handleUpdateSearch
   */

  async function handleUpdateSearch (settings = {}, options) {
    const response = await updateSearch(settings, options);
    return response;
  }

  /**
   * handleClearSearch
   */

  function handleClearSearch ({ resetView = false } = {}) {
    const errorBase = 'handleClearSearch - Failed to clear search';
    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(map)) {
      logger.warn(`${errorBase}: Invalid leaflet element`);
      return;
    }

    clearSearch();
    clearActiveFilters();

    clearLayers();

    if (resetView) {
      resetMapView();
    }
  }

  /**
   * handleResolveBeforeSearch
   */

  async function handleResolveBeforeSearch ({ settings = {} } = {}) {
    const errorBase = 'handleResolveBeforeSearch - Failed to resolve';
    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(map)) {
      logger.warn(`${errorBase}: Invalid leaflet element`);
      return;
    }

    const {
      center = {},
      geoJson = {},
      zoom,
      featureGroup = mapFeatureGroup
    } = settings;

    addShapeToMap({
      featureGroup,
      shapeOptions,
      panToShape: true,
      center,
      geoJson,
      zoom
    });
  }

  /**
   * handleClearFilters
   */

  async function handleClearActiveFilters () {
    const { active } = clearActiveFilters();
    const response = await handleUpdateSearch({
      filters: active
    });
    return response;
  }

  return {
    geoSearch: {
      ...geoSearch,
      search: handleSearch,
      searchPlacename: handleSearchPlacename,
      updateSearch: handleUpdateSearch,
      clearSearch: handleClearSearch
    },

    map: {
      ...map
    },

    geoFilters: {
      ...geoFilters,
      clearActiveFilters: handleClearActiveFilters
    },

    activeDateRange
  };
}
