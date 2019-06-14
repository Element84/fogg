import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Lens from '../../components/Lens';
import ItemList from '../../components/ItemList';
import Panel from '../../components/Panel';
import Button from '../../components/Button';

import Request from '../../models/request';

const stories = storiesOf('Components|Lens', module);

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

stories.add('Default', () => {
  function handleResolveOnSearch ({ geoJson, page }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            label: `#1 from ${JSON.stringify(geoJson)}`,
            to: '#'
          },
          {
            label: `#2 from ${JSON.stringify(geoJson)} 2`,
            to: '#'
          }
        ]);
      }, 1000);
    });
  }

  function testPatchTextQuery (args) {
    const { textInput } = args;
    action('test-testPatchTextQuery')(textInput);
    return handleResolveOnSearch(args);
  }

  return (
    <>
      <Lens
        defaultCenter={DEFAULT_CENTER}
        zoom={2}
        resolveOnSearch={testPatchTextQuery}
        SidebarComponents={SidebarPanels}
      />
    </>
  );
});

stories.add('Open Street Map - No Search', () => {
  const services = [
    {
      name: 'open_street_map',
      format: 'png',
      attribution: '&copy; OpenStreetMap contributors',
      tileEndpoint: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
    }
  ];
  return (
    <>
      <Lens
        defaultCenter={DEFAULT_CENTER}
        zoom={2}
        services={services}
        map="open_street_map"
        search={false}
      />
    </>
  );
});

stories.add('Earth Search', () => {
  async function handleResolveOnSearch ({
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

    function filtersToQuery (activeFilters) {
      let filterQuery = {};

      activeFilters.forEach(activeFilter => {
        let parent;
        let { id, value } = activeFilter;

        if (id.includes('/')) {
          id = id.split('/');
          parent = id[0];
          id = id[1];
        }

        if (parent === 'properties') {
          filterQuery[id] = {
            eq: value
          };
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
          to: '#'
        };
      });
    }

    return {
      features: responseFeatures || [],
      hasMoreResults: responseHasMoreResults(responseMeta)
    };
  }

  function handleUseMapEffect ({ leafletElement }) {
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

  return (
    <>
      <Lens
        defaultCenter={DEFAULT_CENTER}
        zoom={2}
        resolveOnSearch={handleResolveOnSearch}
        SidebarComponents={SidebarPanels}
        useMapEffect={handleUseMapEffect}
        placeholder="Look stuffs on Earth Data"
        availableFilters={[
          {
            label: 'Collection',
            id: 'properties/collection',
            type: 'radiolist',
            list: ['sentinel-2-l1c'],
            defaultValue: false
          },
          {
            label: 'Sentinel Grid Square',
            id: 'properties/sentinel:grid_square',
            type: 'radiolist',
            list: [
              'UH',
              'UJ',
              'MD',
              'VT',
              'ND',
              'FV',
              'PD',
              'WT',
              'VU',
              'WU',
              'NC',
              'PC',
              'GL'
            ],
            defaultValue: false
          }
        ]}
      />
    </>
  );
});

const SidebarPanels = ({
  results,
  loadMoreResults,
  clearActiveSearch,
  filters
}) => {
  const hasResults = Array.isArray(results) && results.length > 0;
  const moreResultsAvailable = typeof loadMoreResults === 'function';
  const { handlers: filtersHandlers } = filters;

  function handleLoadMore (e) {
    if (moreResultsAvailable) {
      loadMoreResults(e);
    }
  }

  function handleClearFilters () {
    if (typeof filtersHandlers.clearActiveFilters === 'function') {
      filtersHandlers.clearActiveFilters();
    }
  }

  function handleClearActiveSearch () {
    if (typeof clearActiveSearch === 'function') {
      clearActiveSearch();
    }
  }

  return (
    <>
      {!hasResults && (
        <>
          {Array.isArray(results) && (
            <Panel header="Explore">
              <p>Sorry, no results were found.</p>
              {filters.active.length > 0 && (
                <p>
                  <Button onClick={handleClearFilters}>Clear Filters</Button>
                </p>
              )}
              <p>
                <Button onClick={handleClearActiveSearch}>Clear Search</Button>
              </p>
            </Panel>
          )}
          <Panel header="Explore">
            <p>Explore stuff</p>
          </Panel>
          <Panel header="Past Searches">
            <ItemList
              items={[
                {
                  label: 'Alexandria, VA',
                  to: '#'
                },
                {
                  label: 'Montes Claros, MG',
                  to: '#'
                }
              ]}
            />
          </Panel>
        </>
      )}

      {hasResults && (
        <>
          <Panel header="Results">
            <ItemList items={results} />
            {moreResultsAvailable && (
              <p>
                <Button onClick={handleLoadMore}>Load More</Button>
              </p>
            )}
          </Panel>
          <Panel>
            <p>
              <Button onClick={handleClearActiveSearch}>Clear Search</Button>
            </p>
          </Panel>
        </>
      )}
    </>
  );
};

SidebarPanels.propTypes = {
  results: PropTypes.array,
  loadMoreResults: PropTypes.func,
  clearActiveSearch: PropTypes.func,
  filters: PropTypes.object
};

function responseHasMoreResults ({ page, limit, found } = {}) {
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
