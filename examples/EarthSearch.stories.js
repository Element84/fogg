import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import './examples.css';

import Story from '../stories/helpers/Story';
import { Lens, Panel, ItemList } from '../ui';
import { useLens } from '../hooks';
import { Request } from '../models';

const STORY_COMPONENT = 'Earth Search';
const STORY_NAME = 'Default';

const stories = storiesOf(`Examples/${STORY_COMPONENT}`, module);

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

/**
 * Sidebar
 * Lens takes a component as a prop which alows us to utilize the Lens API
 * and do whatever we want whether that's showing the results or creating
 * additional interfaces to manipulate the UI
 */

const Sidebar = () => {
  const lens = useLens() || {};
  const { geoSearch } = lens;
  const { results = {} } = geoSearch;
  const { hasResults, numberOfResults, features } = results;
  return (
    <div className="sidebar-results">
      {hasResults && (
        <Panel header={`Results ${numberOfResults}`}>
          <ItemList items={features} />
        </Panel>
      )}
    </div>
  );
};

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <div className="story-map">
        <Lens
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={2}
          resolveOnSearch={handleResolveOnEarthSearch}
          SidebarComponents={Sidebar}
          placeholder="Look stuffs on Earth Data"
        />
      </div>
    </Story>
  );
});

/**
 * handleResolveOnEarthSearch
 * Function that gets used to handle any async lookups
 * or search requests. Resolves as a promise. Here we're
 * using Earth Search as an example endpoint, which
 * makes a request to a STAC API, and resolves the results
 */

export async function handleResolveOnEarthSearch ({
  geoJson = {},
  filters,
  page,
  date
} = {}) {
  const { features = [] } = geoJson;
  const { geometry } = features[0] || {};

  let response;
  let responseFeatures;

  const request = new Request(
    'https://earth-search.aws.element84.com/stac/search'
  );

  const data = {
    limit: 5,
    time: lensDateToSatTime(date),
    page
  };

  if (geometry) {
    data.intersects = geometry;
  }

  if (filters) {
    data.query = filtersToQuery(filters);
  }

  function filtersToQuery (activeFilters = []) {
    const filterQuery = {};

    activeFilters.forEach((activeFilter) => {
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

  action('lens-handleResolveOnEarthSearch')({
    data
  });

  try {
    response = await request.post();
  } catch (e) {
    throw new Error(`Failed to get search results: ${e}`);
  }

  responseFeatures = response && response.data && response.data.features;

  const responseMeta = response && response.data && response.data.meta;
  const numberOfResults = responseMeta && responseMeta.found;

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

/**
 * lensDateToSatTime
 * @description Converts an Lens date object to SAT API friendly string
 * @see http://sat-utils.github.io/sat-api/#search-stac-items-by-simple-filtering-
 */

export function lensDateToSatTime ({ start, end } = {}) {
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

/**
 * responseHasMoreResults
 * @description Converts an Lens date object to SAT API friendly string
 * @see http://sat-utils.github.io/sat-api/#search-stac-items-by-simple-filtering-
 */

export function responseHasMoreResults ({ page, limit, found } = {}) {
  if (page * limit < found) return true;
  return false;
}
