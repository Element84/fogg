import { useState } from 'react';

import {
  geoJsonFromLatLn,
  clearLeafletElementLayers,
  addLeafletMarkerLayer
} from '../lib/leaflet';

import { resolveLensAutocomplete } from '../lib/lens';

import { useFilters } from '.';

export default function useLens ({
  defaultCenter = {},
  resolveOnSearch,
  refMapDraw,
  availableFilters
}) {
  const mapConfigDefaults = {
    center: defaultCenter,
    geoJson: geoJsonFromLatLn(defaultCenter),
    textInput: '',
    date: {},
    page: 1
  };
  const [mapConfig, updateMapConfig] = useState(mapConfigDefaults);
  const [results, updateResults] = useState();
  const [moreResultsAvailable, updateMoreResultsAvailable] = useState();

  const {
    filters,
    openFilters,
    storeFilterChanges,
    saveFilterChanges,
    cancelFilterChanges,
    clearActiveFilters
  } = useFilters(availableFilters);

  /**
   * search
   * @description HAndle search functionality given layer settings and a date
   */

  function search ({
    layer = {},
    date = mapConfig.date,
    textInput = mapConfig.textInput,
    page = 1,
    activeFilters = filters.active
  } = {}) {
    let { center = mapConfig.center, geoJson = mapConfig.geoJson } = layer;

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
      page,
      filters: activeFilters
    };

    if (typeof resolveOnSearch === 'function') {
      resolveOnSearch(params).then(({ features = [], hasMoreResults } = {}) => {
        // If the page is greater than 1, we should append the results
        const baseResults = Array.isArray(results) && page > 1 ? results : [];
        const updatedResults = [...baseResults, ...features];
        updateResults(updatedResults);
        updateMoreResultsAvailable(!!hasMoreResults);
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

  /**
   * handleUpdateSearchParams
   */

  function handleUpdateSearchParams () {
    // Save and update any filter changes
    const updatedFilters = saveFilterChanges();

    // Trigger a new search
    search({
      activeFilters: updatedFilters.active
    });
  }

  /**
   * handleClearActiveFilters
   */

  function handleClearActiveFilters () {
    const updatedFilters = clearActiveFilters();
    search({
      activeFilters: updatedFilters.active
    });
  }

  /**
   * handleClearSearch
   */

  function handleClearSearch () {
    updateMapConfig(mapConfigDefaults);
    updateResults(undefined);
    updateMoreResultsAvailable(false);
  }

  return {
    mapConfig,
    results,
    handlers: {
      handleOnCreated,
      handleOnSearch,
      resolveLensAutocomplete,
      handleUpdateSearchParams,
      loadMoreResults: moreResultsAvailable ? handleLoadMoreResults : undefined,
      clearActiveSearch: handleClearSearch
    },
    filters: {
      ...filters,
      handlers: {
        openFilters,
        storeFilterChanges,
        cancelFilterChanges,
        clearActiveFilters: handleClearActiveFilters
      }
    }
  };
}
