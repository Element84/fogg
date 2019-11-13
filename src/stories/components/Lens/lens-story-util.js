import Request from '../../../models/request';

// Setting up our available filters array let's Lens know what the
// filter UI can use to set the options available in the filters pane

export const earthSearchAvailableFilters = [
  {
    label: 'Collection',
    id: 'properties/collection',
    type: 'radiolist',
    list: ['sentinel-2-l1c']
  },
  {
    label: 'Sentinel Grid Square',
    id: 'properties/sentinel:grid_square',
    type: 'radiolist',
    list: [
      'EG',
      'FV',
      'GL',
      'KA',
      'MD',
      'NC',
      'ND',
      'PC',
      'PD',
      'UH',
      'UJ',
      'VT',
      'VU',
      'WT',
      'WU'
    ]
  },
  {
    label: 'Cloud Cover',
    id: 'properties/eo:cloud_cover',
    type: 'range',
    range: {
      min: 0.1,
      max: 0.9
    },
    defaultValue: {
      min: 0.2,
      max: 0.8
    }
  }
];

// Function that gets used to handle any async lookups
// or search requests. Resolves as a promise. Here we're
// using Earth Search as an example endpoint, which
// makes a request to a STAC API, and resolves the results

export async function handleResolveOnEarthSearch ({
  geoJson = {},
  page,
  filters,
  date
} = {}) {
  const { features = [] } = geoJson;
  const { geometry } = features[0] || {};
  let data;
  let response;
  let responseFeatures;
  let responseMeta;
  let numberOfResults;

  const request = new Request(
    'https://earth-search.aws.element84.com/stac/search'
  );

  if (!geometry) {
    return [];
  }

  data = {
    intersects: geometry,
    limit: 5,
    time: atlasDateToSatTime(date),
    page
  };

  if (filters) {
    data.query = filtersToQuery(filters);
  }

  function filtersToQuery (activeFilters = []) {
    const filterQuery = {};

    activeFilters.forEach(activeFilter => {
      let parent;
      let { id, value } = activeFilter;

      if (id.includes('/')) {
        id = id.split('/');
        parent = id[0];
        id = id[1];
      }

      if (value && parent === 'properties') {
        if (value.min || value.max) {
          filterQuery[id] = {
            ...(value.min && {
              gte: value.min
            }),
            ...(value.max && {
              lte: value.max
            })
          };
        } else {
          filterQuery[id] = {
            eq: value
          };
        }
      }
    });

    return filterQuery;
  }

  request.setData(data);

  request.setOptions({
    headers: {
      Accept: 'application/geo+json',
      'Content-Type': 'application/json'
    }
  });

  try {
    response = await request.post();
  } catch (e) {
    throw new Error(`Failed to get search results: ${e}`);
  }

  responseFeatures = response && response.data && response.data.features;
  responseMeta = response && response.data && response.data.meta;
  numberOfResults = responseMeta && responseMeta.found;

  if (Array.isArray(responseFeatures)) {
    responseFeatures = responseFeatures.map((feature = {}) => {
      const { properties, id } = feature;
      const { collection } = properties;
      return {
        label: `${id}`,
        sublabels: [
          `Collection: ${collection}`,
          `GeoJSON: ${JSON.stringify(geoJson)}`,
          `Sentinel Grid Square: ${properties['sentinel:grid_square']}`,
          `Date: ${properties.datetime}`
        ],
        icon: false
      };
    });
  }

  return {
    features: responseFeatures || [],
    hasMoreResults: responseHasMoreResults(responseMeta),
    numberOfResults
  };
}

// Lens has an effect hook that we can set up that will fire after
// the Map component renders. Here we're using a plugin to set
// the active area of the Map UI to the space to the right
// of the sidebar, so that the center of the map is centered
// within that space

export function handleEarthSearchUseMapEffect ({ leafletElement }) {
  // By class leafletElement.setActiveArea('map-active-area')
  // Creates a new div for that area
  leafletElement.setActiveArea({
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    height: '100vh',
    marginLeft: '385px'
  });
}

export function responseHasMoreResults ({ page, limit, found } = {}) {
  if (page * limit < found) return true;
  return false;
}

/**
 * atlasDateToSatTime
 * @description Converts an Atlas date object to SAT API friendly string
 * @see http://sat-utils.github.io/sat-api/#search-stac-items-by-simple-filtering-
 */

export function atlasDateToSatTime ({ start, end } = {}) {
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
