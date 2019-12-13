import React from 'react';
import PropTypes from 'prop-types';
import { FaRocket } from 'react-icons/fa';

import { getGeoJsonCenter, latLngFromGeoJson } from '../../../lib/leaflet';

import Panel from '../../../components/Panel';
import ItemList from '../../../components/ItemList';
import Button from '../../../components/Button';

// Lens lets us pass in a component for our Sidebar. The component
// takes a few props as arguments such as the given results and some
// actions that allow us to create a unique sidebar experience for
// whatever app thats getting built

const GEOJSON_MONTES_CLAROS_POLYGON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-126.298828125, 36.03133177633187],
            [-118.21289062499999, 36.03133177633187],
            [-118.21289062499999, 40.17887331434696],
            [-126.298828125, 40.17887331434696],
            [-126.298828125, 36.03133177633187]
          ]
        ]
      }
    }
  ]
};

const GEOJSON_MONTES_CLAROS_CENTER = getGeoJsonCenter(
  GEOJSON_MONTES_CLAROS_POLYGON
);
const GEOJSON_MONTES_CLAROS_LAT_LNG = latLngFromGeoJson(
  GEOJSON_MONTES_CLAROS_CENTER
)[0];

const EarthSearchSidebarPanels = ({
  geoSearch = {},
  lens = {},


  filters = {}
}) => {
  const { results = {}, search, searchPlacename, loadMoreResults, clearSearch } = geoSearch;
  const { features, hasResults, hasMoreResults, numberOfResults } = results;

  // FIXME filters
  const { handlers: filtersHandlers } = filters;

  function handleLoadMore (e) {
    if (hasMoreResults) {
      loadMoreResults(e);
    }
  }

  function handleClearFilters () {
    if (typeof filtersHandlers.clearActiveFilters === 'function') {
      filtersHandlers.clearActiveFilters();
    }
  }

  function handleClearSearch () {
    if (typeof clearSearch === 'function') {
      clearSearch();
    }
  }

  function handleTriggerQuerySearchTextOnly () {
    searchPlacename({
      textInput: 'Alexandria, VA',
    });
  }

  function handleTriggerQuerySearchTextAndFilters () {
    search({
      textInput: 'San Francisco, CA',
      activeFilters: [
        {
          id: 'properties/sentinel:grid_square',
          value: 'EG'
        },
        {
          id: 'properties/collection',
          value: 'sentinel-2-l1c'
        }
      ],
      dropMarker: true
    });
  }

  return (
    <>
      {!hasResults && (
        <>
          {Array.isArray(features) && (
            <Panel header="Explore">
              <p>Sorry, no results were found.</p>
              {filters.active && filters.active.length > 0 && (
                <p>
                  <Button onClick={handleClearFilters}>Clear Filters</Button>
                </p>
              )}
              <p>
                <Button onClick={handleClearSearch}>Clear Search</Button>
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
                  label: 'Alexandria, VA - Placename Search',
                  onClick: () => {
                    searchPlacename({
                      textInput: 'Alexandria, VA'
                    })
                  }
                },
                {
                  label: 'Montes Claros, MG - Polygon',
                  onClick: () => {
                    search({
                      geoJson: GEOJSON_MONTES_CLAROS_POLYGON,
                      center: GEOJSON_MONTES_CLAROS_LAT_LNG,
                      activeFilters: [],
                      dropMarker: true,
                      zoom: 4
                    });
                  }
                }
              ]}
            />
          </Panel>
        </>
      )}

      {hasResults && (
        <>
          <Panel
            header={
              <>
                {'Results '}
                {numberOfResults}
                <FaRocket />
              </>
            }
          >
            <ItemList items={features} />
            {hasMoreResults && (
              <p>
                <Button onClick={handleLoadMore}>Load More</Button>
              </p>
            )}
          </Panel>
          <Panel>
            <p>
              <Button onClick={handleClearSearch}>Clear Search</Button>
            </p>
          </Panel>
        </>
      )}

      <Panel header="Test Query Params">
        <h4 className="flat-bottom">Text Only</h4>
        <ItemList
          items={[
            {
              label: 'Query: Alexandria, VA',
              icon: false
            }
          ]}
        />
        <p>
          <Button onClick={handleTriggerQuerySearchTextOnly}>
            Trigger Search
          </Button>
        </p>

        <h4 className="flat-bottom">Text & Filters</h4>
        <ItemList
          items={[
            {
              label: 'Query: San Francisco, CA',
              icon: false
            },
            {
              label: 'Filter: Grid Square - EG',
              icon: false
            },
            {
              label: 'Filter: Collection - sentinel-2-l1c',
              icon: false
            }
          ]}
        />
        <p>
          <Button onClick={handleTriggerQuerySearchTextAndFilters}>
            Trigger Search
          </Button>
        </p>
      </Panel>
    </>
  );
};

EarthSearchSidebarPanels.propTypes = {
  results: PropTypes.array,
  numberOfResults: PropTypes.number,
  loadMoreResults: PropTypes.func,
  search: PropTypes.func,
  filters: PropTypes.object
};

export default EarthSearchSidebarPanels;
