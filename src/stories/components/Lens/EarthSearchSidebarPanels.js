import React from 'react';
import PropTypes from 'prop-types';
import { FaRocket } from 'react-icons/fa';

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
            [-43.8739013671875, -16.599345725849386],
            [-44.1046142578125, -16.65198092045974],
            [-44.088134765625, -16.86237670846054],
            [-43.670654296875, -16.914939206301646],
            [-43.59375, -16.66776866124074],
            [-43.8739013671875, -16.599345725849386]
          ]
        ]
      }
    }
  ]
};

const EarthSearchSidebarPanels = ({ geoSearch = {}, geoFilters = {} }) => {
  const {
    results = {},
    search,
    searchPlacename,
    loadMoreResults,
    clearSearch
  } = geoSearch;
  const { features, hasResults, hasMoreResults, numberOfResults } = results;

  const { filters, clearActiveFilters } = geoFilters;

  function handleLoadMore (e) {
    if (hasMoreResults) {
      loadMoreResults(e);
    }
  }

  function handleClearFilters () {
    if (typeof clearActiveFilters === 'function') {
      clearActiveFilters();
    }
  }

  function handleClearSearch () {
    if (typeof clearSearch === 'function') {
      clearSearch();
    }
  }

  function handleTriggerQuerySearchTextOnly () {
    searchPlacename({
      textInput: 'Alexandria, VA'
    });
  }

  function handleTriggerQuerySearchTextAndFilters () {
    searchPlacename({
      textInput: 'San Francisco, CA',
      filters: [
        {
          id: 'properties/sentinel:grid_square',
          value: 'EG'
        },
        {
          id: 'properties/collection',
          value: 'sentinel-2-l1c'
        }
      ]
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
                    });
                  }
                },
                {
                  label: 'Montes Claros, MG - Polygon, Zoom 6',
                  onClick: () => {
                    search({
                      geoJson: GEOJSON_MONTES_CLAROS_POLYGON,
                      filters: [],
                      zoom: 6
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
  geoSearch: PropTypes.object,
  geoFilters: PropTypes.object
};

export default EarthSearchSidebarPanels;
