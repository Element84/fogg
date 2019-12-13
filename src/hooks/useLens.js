import { useState, useEffect, useContext } from 'react';

import {
  isValidLeafletElement,
  currentLeafletRef,
  addGeoJsonLayer,
  centerMapOnGeoJson,
  geoJsonFromLatLn,

  addLeafletMarkerLayer,
  addLeafletShapeLayer,
  geometryTypeFromGeoJson,
  latLngFromGeoJson
} from '../lib/leaflet';

import { LensContext } from '../context';

import { clearSearchComplete } from '../components/SearchComplete';

import { useFilters } from '.';
import { formatMapServiceDate } from '../lib/datetime';

let hasRenderedOnce = false;

/**
 * mapGeocodeCandidates
 * @description Function that takes a given candidate and returns usable result object
 */

export function mapGeocodeCandidates({ address, location } = {}) {
  return {
    label: address,
    sublabel: `Location: ${location.x}, ${location.y}`,
    value: location
  };
}

export default function useLens (lensSettings = {}) {
  const {
    refMapDraw = {},
    refSearchComplete,
    availableFilters,
    availableServices = []
  } = lensSettings;


  const { geoSearch = {}, map = {}, lensTempVariable = {} } = useContext(LensContext) || {};
  const { search, searchPlacename } = geoSearch;
  const { refMap, mapConfig = {} } = map;
  const { defaultCenter } = mapConfig;

  /**
   * handleSearch
   */

  async function handleSearch() {
    const request = await search.apply(this, Array.prototype.slice.call(arguments, 0));
    console.log('request', request);

    // addGeoJsonLayer()
    // console.log('handleSearch', arguments);
    return request;
  }

  /**
   * handleSearch
   */

  async function handleSearchPlacename(settings = {}, options) {
    return await searchPlacename(settings, {
      ...options,
      resolveBeforeSearch: handleResolveOnPlacenameAutocomplete
    })
  }

  /**
   * handleResolveOnPlacenameAutocomplete
   */

  async function handleResolveOnPlacenameAutocomplete({ settings } = {}) {
    const map = currentLeafletRef(refMap);

    const { center = {} } = settings;
    const geoJson = geoJsonFromLatLn(center);

    if ( isValidLeafletElement(map)) {
      addGeoJsonLayer(geoJson, map);
      centerMapOnGeoJson(geoJson, map);
    }
  }














  const {
    filters,
    openFilters,
    storeFilterChanges,
    saveFilterChanges,
    setActiveFilters,
    cancelFilterChanges,
    clearActiveFilters
  } = useFilters(availableFilters);






  const [mapServices, updateMapServices] = useState(availableServices);




  // We want to handle any of our map viewport changes using the leaflet element
  // rather than rerendering to prevent our props from overriding the map, and
  // generally this should help performance of having to rerender the whole map

  // useEffect(() => {
  //   const { customZoom } = mapConfig;
  //   if (!hasRenderedOnce) {
  //     hasRenderedOnce = true;
  //     return;
  //   }
  //   console.log('defaultCenter', defaultCenter)
  //   setView(defaultCenter, customZoom);
  // }, [mapConfig.center, mapConfig.customZoom]);

  // We need to drop map markers using the effect hook as we don't always have the
  // leaflet element available via a ref if it's the first time rendering

  // useEffect(() => {
  //   if (mapConfig.marker) {
  //     addSearchMarker(mapConfig.geoJson);
  //   }
  // }, [mapConfig.marker, mapConfig.geoJson]);

  // If we have a default date range, we want to trigger a search on the first load
  // to allow us to immediatelly prompt the results

  // useEffect(() => {
  //   if (!hasRenderedOnce) {
  //     console.log('useEffect')
  //     search();
  //   }
  // }, [hasRenderedOnce]);

  // useEffect(() => {
  //   updateTileDate(date);
  // }, [date]);


  // /**
  //  * search
  //  * @description Handle search functionality given layer settings and a date
  //  */

  // async function search ({
  //   layer,
  //   date: searchDate = date,
  //   textInput,
  //   page = 1,
  //   activeFilters,
  //   saveUnsavedFilters = false,
  //   closeFilters = true,
  //   dropMarker = false,
  //   center = mapConfig.center,
  //   geoJson = mapConfig.geoJson,
  //   zoom
  // } = {}) {
  //   const errorBase = 'Failed to search';

  //   const mapUpdate = {
  //     ...mapConfig,
  //     page,
  //     center,
  //     geoJson,
  //     marker: dropMarker,
  //     customZoom: zoom
  //   };

  //   let searchRequest;
  //   let autocompleteRequest;
  //   let updatedFilters;

  //   if (textInput && textInput.length > 0) {
  //     mapUpdate.textInput = textInput;

  //     try {
  //       autocompleteRequest = await resolveLensAutocomplete(textInput);
  //     } catch (e) {
  //       throw new Error(`${errorBase}: Error resolving autocomplete; ${e}`);
  //     }

  //     if (Array.isArray(autocompleteRequest)) {
  //       const { value } = autocompleteRequest[0];
  //       mapUpdate.center = getCenterFromSearchQuery(value);
  //       mapUpdate.geoJson = geoJsonFromLatLn(mapUpdate.center);
  //     }
  //   } else if (textInput === false) {
  //     // Hacky way to give us the option to clear the textInput until we
  //     // can refactor this function
  //     mapUpdate.textInput = undefined;
  //   }


  //   // If the original activeFilters argument exists, it probably means
  //   // we want to override the existing active filters. In this case,
  //   // we'll explicitly set the filters, otherwise, if we're trying to
  //   // create a new search, we can assume we're going to leave out any
  //   // working changes of the filters

  //   if (saveUnsavedFilters) {
  //     updatedFilters = saveFilterChanges({
  //       closeFilters
  //     });
  //   } else {
  //     updatedFilters = setActiveFilters(activeFilters || [], {
  //       closeFilters
  //     });
  //   }


  //   const params = {
  //     geoJson: mapUpdate.geoJson,
  //     date: searchDate.date ? searchDate.date : searchDate,
  //     filters: updatedFilters.active,
  //     textInput: mapUpdate.textInput,
  //     page
  //   };

  //   // If we dont haev a query or filters, there's nothing to search, so
  //   // clear out the results and just dont make a search

  //   const searchHasQuery = params.textInput && params.textInput.length > 0;
  //   const searchHasLocation =
  //     params.geoJson && params.geoJson.type === 'FeatureCollection';
  //   const searchHasFilters = params.filters.length > 0;
  //   const searchHasDate = date.date && date.date.start && date.date.end;
  //   const searchHasParameter =
  //     searchHasQuery || searchHasLocation || searchHasFilters || searchHasDate;

  // }




  /**
   * handleClearActiveFilters
   * @description Handles lens events upon clearing active filters
   */

  function handleClearActiveFilters () {
    console.log('handleClearActiveFilters')
    const updatedFilters = clearActiveFilters();
    search({
      activeFilters: updatedFilters.active
    });
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

    geoSearch: {
      ...geoSearch,
      search: handleSearch,
      searchPlacename: handleSearchPlacename
    },

    map: {
      ...map
    },

    lens: {
      ...lensTempVariable
    },





    mapServices,
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
