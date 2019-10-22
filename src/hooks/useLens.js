import { useState, useEffect } from 'react';

import {
  geoJsonFromLatLn,
  clearLeafletElementLayers,
  addLeafletMarkerLayer
} from '../lib/leaflet';
import { resolveLensAutocomplete } from '../lib/lens';
import { isEmptyObject } from '../lib/util';

import { clearSearchComplete } from '../components/SearchComplete';

import { useFilters } from '.';
import { formatMapServiceDate } from '../lib/datetime';

let hasRenderedOnce = false;

export default function useLens ({
  defaultCenter = {},
  resolveOnSearch,
  refMap,
  refMapDraw,
  refSearchComplete,
  availableFilters,
  availableServices = [],
  defaultZoom,
  defaultDateRange = {},
  onCreatedDraw
}) {
  const defaultGeoJson =
    typeof geoJsonFromLatLn === 'function' && geoJsonFromLatLn(defaultCenter);

  const [date, setDate] = useState({
    dateIsOpen: false,
    date: defaultDateRange
  });
  const mapConfigDefaults = {
    center: defaultCenter,
    geoJson: defaultGeoJson,
    textInput: '',
    page: 1,
    marker: false
  };
  const [mapConfig, updateMapConfig] = useState(mapConfigDefaults);
  const [results, updateResults] = useState();
  const [moreResultsAvailable, updateMoreResultsAvailable] = useState();
  const [totalResults, updateTotalResults] = useState();
  const [mapServices, updateMapServices] = useState(availableServices);

  const {
    filters,
    openFilters,
    storeFilterChanges,
    saveFilterChanges,
    setActiveFilters,
    cancelFilterChanges,
    clearActiveFilters
  } = useFilters(availableFilters);

  // We want to handle any of our map viewport changes using the leaflet element
  // rather than rerendering to prevent our props from overriding the map, and
  // generally this should help performance of having to rerender the whole map

  useEffect(() => {
    const { center } = mapConfig;
    if (!hasRenderedOnce) {
      setView(center, defaultZoom);
      hasRenderedOnce = true;
    } else {
      panTo(center);
    }
  }, [hasRenderedOnce, mapConfig.center, defaultZoom]);

  // We need to drop map markers using the effect hook as we don't always have the
  // leaflet element available via a ref if it's the first time rendering

  useEffect(() => {
    if (mapConfig.marker) {
      addSearchMarker(mapConfig.center);
    }
  }, [mapConfig.marker, mapConfig.center]);

  // If we have a default date range, we want to trigger a search on the first load
  // to allow us to immediatelly prompt the results

  useEffect(() => {
    if (!hasRenderedOnce) {
      search();
    }
  }, [hasRenderedOnce]);

  useEffect(() => {
    updateTileDate(date);
  }, [date]);

  /**
   * handleDateChange
   * @description Handles date change events
   */
  function handleDateChange (date) {
    setDate(date);
  }

  /**
   * setView
   * @description Wraps the leaflet setView method and triggers on our map ref
   */

  function setView (center, zoom) {
    const { current = {} } = refMap;
    const { leafletElement = {} } = current;
    let mapZoom;

    // If we can find the existing zoom, use that to prevent changing the zoom
    // level on someone interacting with the map
    if (zoom) {
      mapZoom = zoom;
    } else {
      mapZoom = leafletElement.getZoom();
    }

    // Fly to our new (or old) center with the zoom

    leafletElement.setView(center, mapZoom);
  }

  /**
   * panTo
   * @description Wraps the leaflet panTo method and triggers on our map ref
   */

  function panTo (center) {
    const { current = {} } = refMap;
    const { leafletElement = {} } = current;
    leafletElement.panTo(center);
  }

  /**
   * search
   * @description Handle search functionality given layer settings and a date
   */

  async function search ({
    layer,
    date: searchDate = date,
    textInput,
    page = 1,
    activeFilters,
    saveUnsavedFilters = false,
    closeFilters = true,
    dropMarker = false,
    center = mapConfig.center,
    geoJson = mapConfig.geoJson
  } = {}) {
    const errorBase = 'Failed to search';

    const mapUpdate = {
      ...mapConfig,
      page,
      center,
      geoJson,
      marker: dropMarker
    };

    let searchRequest;
    let autocompleteRequest;
    let updatedFilters;

    if (textInput && textInput.length > 0) {
      mapUpdate.textInput = textInput;

      try {
        autocompleteRequest = await resolveLensAutocomplete(textInput);
      } catch (e) {
        throw new Error(`${errorBase}: Error resolving autocomplete; ${e}`);
      }

      if (Array.isArray(autocompleteRequest)) {
        const { value } = autocompleteRequest[0];
        mapUpdate.center = getCenterFromSearchQuery(value);
        mapUpdate.geoJson = geoJsonFromLatLn(mapUpdate.center);
      }
    }

    // If the search invokation passed in a layer, let's use that to determine
    // where we want to position and display our search features

    if (layer) {
      mapUpdate.center = layer.center || mapUpdate.center;
      mapUpdate.geoJson = layer.geoJson || mapUpdate.geoJson;
    }

    // If we don't have a geoJson document yet but we have a center, build
    // that geoJson from the center

    if (
      (!mapUpdate.geoJson || isEmptyObject(mapUpdate.geoJson)) &&
      mapUpdate.center
    ) {
      mapUpdate.geoJson = geoJsonFromLatLn(mapUpdate.center);
    }

    // If the original activeFilters argument exists, it probably means
    // we want to override the existing active filters. In this case,
    // we'll explicitly set the filters, otherwise, if we're trying to
    // create a new search, we can assume we're going to leave out any
    // working changes of the filters

    if (saveUnsavedFilters) {
      updatedFilters = saveFilterChanges({
        closeFilters
      });
    } else {
      updatedFilters = setActiveFilters(activeFilters || [], {
        closeFilters
      });
    }

    updateMapConfig(mapUpdate);

    const params = {
      geoJson: mapUpdate.geoJson,
      date: searchDate.date ? searchDate.date : searchDate,
      filters: updatedFilters.active,
      textInput: mapUpdate.textInput,
      page
    };

    // If we dont haev a query or filters, there's nothing to search, so
    // clear out the results and just dont make a search

    const searchHasQuery = params.textInput && params.textInput.length > 0;
    const searchHasLocation =
      params.geoJson && params.geoJson.type === 'FeatureCollection';
    const searchHasFilters = params.filters.length > 0;
    const searchHasDate = date.date && date.date.start && date.date.end;
    const searchHasParameter =
      searchHasQuery || searchHasLocation || searchHasFilters || searchHasDate;

    if (!searchHasParameter) {
      updateTotalResults(0);
      updateResults(undefined);
      updateMoreResultsAvailable(false);
      return;
    }

    if (typeof resolveOnSearch === 'function') {
      try {
        searchRequest = await resolveOnSearch(params);
      } catch (e) {
        throw new Error(`${errorBase}: Error resolving search; ${e}`);
      }

      const { features = [], hasMoreResults, numberOfResults } =
        searchRequest || {};

      // If the page is greater than 1, we should append the results

      const baseResults = Array.isArray(results) && page > 1 ? results : [];
      const updatedResults = [...baseResults, ...features];

      updateResults(updatedResults);
      updateTotalResults(numberOfResults);
      updateMoreResultsAvailable(!!hasMoreResults);
    }
  }

  /**
   * handleOnSearch
   * @description Fires when a search is performed via SearchComplete
   */

  function handleOnSearch (
    query = {},
    date,
    textInput,
    activeFilters = filters.active
  ) {
    const center = getCenterFromSearchQuery(query);
    const searchLayer = {
      center,
      geoJson: center && geoJsonFromLatLn(center)
    };

    search({
      layer: searchLayer,
      date,
      textInput,
      activeFilters,
      dropMarker: true
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

  function handleOnCreated (layer, leafletElement) {
    if (typeof onCreatedDraw === 'function') {
      const noSearch = onCreatedDraw(layer, leafletElement);
      if (noSearch) return;
    }
    handleClearSearch({
      clearLayers: false
    });

    search({
      ...mapConfigDefaults,
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

  function handleUpdateSearchParams ({ closeFilters = true }) {
    // Trigger a new search
    search();
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
   * handleClearSearch
   * @description Clears all aspects of an active search from the state
   */

  function handleClearSearch ({ clearLayers = true } = {}) {
    const { current } = refSearchComplete;

    const mapConfigUpdate = {
      ...mapConfigDefaults,
      center: mapConfig.center
    };

    mapConfigUpdate.geoJson = geoJsonFromLatLn(mapConfigUpdate.center);

    updateMapConfig(mapConfigUpdate);
    clearActiveFilters();
    setDate({});
    clearSearchComplete(current);
    updateResults(undefined);
    updateMoreResultsAvailable(false);

    if (clearLayers) {
      clearSearchLayers();
    }
  }

  function updateTileDate (date) {
    const { date: dateRange = {} } = date || {};
    const tileDate =
      formatMapServiceDate(dateRange.end) ||
      formatMapServiceDate(dateRange.start);
    updateMapServices(
      availableServices.map(service => {
        return {
          ...service,
          time: service.enableDynamicTime
            ? tileDate || service.time
            : service.time
        };
      })
    );
  }

  return {
    mapConfig,
    date,
    mapServices,
    results,
    numberOfResults: totalResults,
    handlers: {
      handleOnCreated,
      handleOnSearch,
      resolveLensAutocomplete,
      handleUpdateSearchParams,
      loadMoreResults: moreResultsAvailable ? handleLoadMoreResults : undefined,
      clearActiveSearch: handleClearSearch,
      handleDateChange,
      search
    },
    filters: {
      ...filters,
      handlers: {
        openFilters,
        saveFilterChanges,
        storeFilterChanges,
        cancelFilterChanges,
        clearActiveFilters: handleClearActiveFilters
      }
    }
  };
}

function getCenterFromSearchQuery (query) {
  // allow user to pass in query as {x,y} or {lng, lat}
  const { x, y, lng, lat } = query;

  const missingXY = !isDefined(x) || !isDefined(y);
  const mixxingLatLng = !isDefined(lng) || !isDefined(lat);

  if (!missingXY) {
    return {
      lng: x,
      lat: y
    };
  }

  if (!mixxingLatLng) {
    return {
      lng,
      lat
    };
  }
}

function isDefined (value) {
  return typeof value !== 'undefined';
}
