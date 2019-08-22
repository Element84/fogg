import { useState, useEffect } from 'react';

import {
  geoJsonFromLatLn,
  clearLeafletElementLayers,
  addLeafletMarkerLayer
} from '../lib/leaflet';
import { resolveLensAutocomplete } from '../lib/lens';

import { clearSearchComplete } from '../components/SearchComplete';

import { useFilters, useLayers, useLocation } from '.';

const QUERY_SEARCH_PARAMS = ['q', 'properties'];

export default function useLens ({
  defaultCenter = {},
  resolveOnSearch,
  refMap,
  refMapDraw,
  refSearchComplete,
  availableFilters,
  availableLayers = null,
  fetchLayerData,
  zoom
}) {
  const defaultGeoJson =
    typeof geoJsonFromLatLn === 'function' && geoJsonFromLatLn(defaultCenter);
  const mapConfigDefaults = {
    center: defaultCenter,
    geoJson: defaultGeoJson,
    textInput: '',
    date: {},
    page: 1
  };
  const [mapConfig, updateMapConfig] = useState(mapConfigDefaults);
  const [results, updateResults] = useState();
  const [moreResultsAvailable, updateMoreResultsAvailable] = useState();
  const [totalResults, updateTotalResults] = useState();

  const { search: locationSearch, history } = useLocation();

  const {
    filters,
    openFilters,
    storeFilterChanges,
    saveFilterChanges,
    setActiveFilters,
    cancelFilterChanges,
    clearActiveFilters
  } = useFilters(availableFilters);

  const { layers, toggleLayer, getDataForLayers } = useLayers(
    availableLayers,
    fetchLayerData
  );

  // On first render, parse any query params in the URL

  useEffect(() => {
    handleQueryParams();
  }, []);

  // We want to handle any of our map viewport changes using the leaflet element
  // rather than rerendering to prevent our props from overriding the map, and
  // generally this should help performance of having to rerender the whole map

  useEffect(() => {
    const { center } = mapConfig;
    flyTo(center);
  }, [mapConfig.center]);

  /**
   * flyTo
   * @description Wraps the leaflet flyTo method and triggers on our map ref
   */

  function flyTo (center) {
    const { current = {} } = refMap;
    const { leafletElement = {} } = current;

    // If we can find the existing zoom, use that to prevent changing the zoom
    // level on someone interacting with the map

    const mapZoom = leafletElement.getZoom();

    // Fly to our new (or old) center with the zoom

    leafletElement.flyTo(center, mapZoom || zoom);
  }

  /**
   * search
   * @description Handle search functionality given layer settings and a date
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
      resolveOnSearch(params).then(
        ({ features = [], hasMoreResults, numberOfResults } = {}) => {
          // If the page is greater than 1, we should append the results
          const baseResults = Array.isArray(results) && page > 1 ? results : [];
          const updatedResults = [...baseResults, ...features];
          updateResults(updatedResults);
          updateTotalResults(numberOfResults);
          updateMoreResultsAvailable(!!hasMoreResults);
        }
      );
    }

    updateMapConfig(mapUpdate);
  }

  /**
   * handleOnSearch
   * @description Fires when a search is performed via SearchComplete
   */

  function handleOnSearch (
    { x, y } = {},
    date,
    textInput,
    activeFilters = filters.active
  ) {
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
      textInput,
      activeFilters
    });
  }

  /**
   * clearSearchLayers
   * @description Clears all marker instances on map
   */

  function clearSearchLayers () {
    const { current } = refMapDraw;
    const { leafletElement } = current || {};
    if (leafletElement) {
      clearLeafletElementLayers(leafletElement);
    }
  }

  /**
   * addSearchMarker
   * @description Adds a new marker at position on map, clears old
   */

  function addSearchMarker (position) {
    const { current } = refMapDraw;
    const { leafletElement } = current || {};
    if (leafletElement) {
      clearSearchLayers();
      addLeafletMarkerLayer(position, leafletElement);
    }
  }

  /**
   * handleOnCreated
   * @description Fires when a layer is created
   */

  function handleOnCreated (layer) {
    handleClearSearch({
      clearLayers: false
    });

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
   * @description Handles lens events upon updating any search params
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
   * @description Handles lens events upon clearing active filters
   */

  function handleClearActiveFilters () {
    const updatedFilters = clearActiveFilters();
    search({
      activeFilters: updatedFilters.active
    });
  }

  /**
   * handleQueryParams
   * @description Pulls in search related query params and updates search
   */

  function handleQueryParams () {
    const urlParams = new URLSearchParams(locationSearch);
    const urlQuery = urlParams.get('q');
    const availableFilters = filters.available;
    const properties = new URLSearchParams(urlParams.get('properties'));

    let queryFilters = [];

    // Loops through any available properties and adds to available filters

    for (let property of properties.entries()) {
      let key = property[0];
      let value = property[1];
      let id = `properties/${key}`;

      availableFilters.find(element => {
        if (element.id === id) {
          queryFilters.push({ id, value });
        }
        return element.id === id;
      });
    }

    // If we have any available search params, trigger an autocomplete with
    // the query to grab the first match then trigger a search with it

    if (urlQuery || queryFilters.length > 0) {
      resolveLensAutocomplete(urlQuery).then(queryResults => {
        if (Array.isArray(queryResults)) {
          const { value } = queryResults[0];
          handleOnSearch(value, {}, urlQuery, queryFilters);
          setActiveFilters(queryFilters);
        }
      });
    }
  }

  /**
   * clearQuerySearchParams
   * @description Remove all serach related query params from URL
   */

  function clearQuerySearchParams () {
    if (typeof locationSearch === 'undefined') return;
    const urlParams = new URLSearchParams(locationSearch);
    QUERY_SEARCH_PARAMS.forEach(param => {
      urlParams.delete(param);
    });

    if (history) {
      history.pushState('', '', `?${urlParams.toString()}`);
    }
  }

  /**
   * handleClearSearch
   * @description Clears all aspects of an active search from the state
   */

  function handleClearSearch ({ clearLayers = true } = {}) {
    const { current } = refSearchComplete;

    clearSearchComplete(current);
    clearQuerySearchParams();
    clearActiveFilters();
    updateResults(undefined);
    updateMoreResultsAvailable(false);

    if (clearLayers) {
      clearSearchLayers();
    }
  }

  return {
    mapConfig,
    results,
    numberOfResults: totalResults,
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
    },
    layers: {
      ...layers,
      handlers: {
        toggleLayer,
        getDataForLayers
      }
    }
  };
}
