import { useState } from 'react';

import { isEmptyObject } from '../lib/util';
import {
  geoJsonFromLatLn,
  getGeoJsonCenter,
  latLngFromGeoJson
} from '../lib/map';

/**
 * useGeoSearch
 */

// These defaults serve both as the set of default values that will be used
// for a search as well as a reference to the params that are available to search

const QUERY_DEFAULT_PARAMS = {
  textInput: '',
  geoJson: undefined,
  center: undefined,
  date: {},
  page: 1,
  filters: [],
  zoom: undefined
};

const QUERY_AVAILABLE_PARAMS = Object.keys(QUERY_DEFAULT_PARAMS);

const UNDEFINED_SEARCH_RESULTS = {
  features: undefined,
  hasMoreResults: false,
  numberOfResults: 0
};

const resolveUndefinedSearch = () => UNDEFINED_SEARCH_RESULTS;

export default function useGeoSearch (geoSearchSettings = {}) {
  const {
    resolveOnSearch = resolveUndefinedSearch,
    resolveOnAutocomplete,
    utc,
    placenameShape
  } = geoSearchSettings;

  const config = {
    utc
  };

  const defaultQueryParams = {};

  QUERY_AVAILABLE_PARAMS.forEach((param) => {
    defaultQueryParams[param] =
      geoSearchSettings[param] || QUERY_DEFAULT_PARAMS[param];
  });

  const defaultResults = {
    features: undefined,
    hasMoreResults: false,
    numberOfResults: 0
  };

  const [queryParams, setQueryParams] = useState(defaultQueryParams);
  const [results, setResults] = useState(defaultResults);

  const { features } = results || {};

  const isActiveSearch = Array.isArray(features);
  const hasResults = isActiveSearch && features.length > 0;

  /**
   * handleSearchPlacename
   * @description
   */

  async function handleSearchPlacename (settings = {}, options = {}) {
    const errorBase = 'Failed to search for placename';
    const { textInput } = settings;
    const { exactMatch = false } = options;

    let autocompleteResponse;
    let entry;

    try {
      autocompleteResponse = await resolveOnAutocomplete(textInput);

      if (exactMatch) {
        entry = autocompleteResponse.find(
          ({ label } = {}) => label === textInput
        );
      } else {
        entry = autocompleteResponse[0];
      }
    } catch (e) {
      throw new Error(`${errorBase}: Error resolving autocomplete; ${e}`);
    }

    // Without an entry, we can't actually make a plcaename search as we have no location
    // to search on

    if (!entry || isEmptyObject(entry)) {
      throw new Error(`${errorBase}: Can not find placename ${textInput}`);
    }

    // Once we have an entry, determine the center

    const { value = {} } = entry;
    const { x, y } = value;

    settings.center = {
      lat: y,
      lng: x
    };

    // If the settings payload includes geoJson, remove it here, as our search can't conflict
    // with the center we're grabbing from the autocomplete result

    if (settings.geoJson) {
      delete settings.geoJson;
    }

    try {
      return await handleSearch(settings, options);
    } catch (e) {
      throw new Error(`${errorBase}: ${e}`);
    }
  }

  /**
   * handleSearch
   * @description
   */

  async function handleSearch (settings = {}, options = {}) {
    const errorBase = 'Failed to make search';
    const searchSettings = configureSearchSettings({
      ...QUERY_DEFAULT_PARAMS,
      ...settings
    });
    const searchOptions = {
      placenameShape
    };
    const { resolveBeforeSearch, concatResults = false } = options;

    let searchResults;

    // Provide a callback option where we can perform some function before creating our actual search

    if (typeof resolveBeforeSearch === 'function') {
      try {
        await resolveBeforeSearch({
          settings: searchSettings,
          options: searchOptions
        });
      } catch (e) {
        throw new Error(
          `${errorBase}: Error resolving before search hook; ${e}`
        );
      }
    }

    try {
      searchResults = await search(searchSettings, resolveOnSearch);
    } catch (e) {
      throw new Error(`${errorBase}: ${e}; ${searchSettings}`);
    }

    if (!searchResults) {
      searchResults = {};
    }

    // In some situations, we don't want to fully replace the search results,
    // we would want to tack them on to the end, so when true, we'll take the
    // original features and add the new features on the end. Particularly
    // useful for "load more results"

    if (concatResults) {
      searchResults = {
        ...searchResults,
        features: [...features, ...searchResults.features]
      };
    }

    setQueryParams(searchSettings);
    setResults(searchResults);

    return {
      settings: searchSettings,
      results: searchResults
    };
  }

  /**
   * handleUpdateSearch
   * @description
   */

  async function handleUpdateSearch (settings) {
    const errorBase = 'Failed to update search';

    try {
      return await handleSearch({
        ...queryParams,
        ...settings
      });
    } catch (e) {
      throw new Error(`${errorBase}: ${e}`);
    }
  }

  /**
   * handleLoadMoreResults
   * @description
   */

  async function handleLoadMoreResults () {
    const errorBase = 'Failed to load more results';

    try {
      return await handleSearch(
        {
          ...queryParams,
          page: queryParams.page + 1
        },
        {
          concatResults: true
        }
      );
    } catch (e) {
      throw new Error(`${errorBase}: ${e}`);
    }
  }

  /**
   * handleClearSearch
   * @description
   */

  function handleClearSearch () {
    setQueryParams(defaultQueryParams);
    setResults(defaultResults);
  }

  /**
   * resolveOnAutocomplete
   * @description
   */

  async function handleResolveOnAutocomplete () {
    const errorBase = 'Failed to resolve autocomplete';

    try {
      return await resolveOnAutocomplete.apply(
        this,
        Array.prototype.slice.call(arguments, 0)
      );
    } catch (e) {
      throw new Error(`${errorBase}: ${e}`);
    }
  }

  return {
    search: handleSearch,
    updateSearch: handleUpdateSearch,
    loadMoreResults: handleLoadMoreResults,
    clearSearch: handleClearSearch,
    searchPlacename: handleSearchPlacename,
    resolveOnAutocomplete: handleResolveOnAutocomplete,
    queryParams,
    config,
    results: {
      ...results,
      hasResults
    },
    isActiveSearch
  };
}

/**
 * configureSearchSettings
 * @description
 */

export function configureSearchSettings (settings) {
  const searchSettings = {};

  const { center, geoJson } = settings;
  const hasGeoJson = geoJson && !isEmptyObject(geoJson);
  const hasCenter = center && !isEmptyObject(center);

  // Loop through all of the keys that are available to search
  // on and populate the search settings with it's value if available

  QUERY_AVAILABLE_PARAMS.forEach((param) => {
    if (settings[param]) {
      searchSettings[param] = settings[param];
    }
  });

  // If our geoJson doc is just 1 singular feature, we want to wrap it
  // in a feature collection for search

  if (hasGeoJson && searchSettings.geoJson.type === 'Feature') {
    searchSettings.geoJson = {
      type: 'FeatureCollection',
      features: [searchSettings.geoJson]
    };
  }

  // If we don't have a center currently set but we have a GeoJSON doc,
  // lets go ahead and populate that center

  if (!searchSettings.center && hasGeoJson) {
    searchSettings.center = getGeoJsonCenter(searchSettings.geoJson);
    searchSettings.center = latLngFromGeoJson(searchSettings.center)[0];
  }

  // Alternatively, if we don't have a GeoJSON but we have a center,
  // create a GeoJSON doc to search for

  if (!searchSettings.geoJson && hasCenter) {
    searchSettings.geoJson = geoJsonFromLatLn(searchSettings.center);
  }

  return searchSettings;
}

/**
 * search
 * @description
 */

export async function search (settings = {}, resolveOnSearch) {
  const errorBase = 'Failed to make search';

  // If we have a resolve function, let's try to make the request here
  // and simply return the response

  if (typeof resolveOnSearch === 'function') {
    let searchResponse;

    try {
      searchResponse = await resolveOnSearch(settings);
    } catch (e) {
      throw new Error(`${errorBase}: Error resolving search; ${e}`, e);
    }

    return searchResponse;
  }
}
