import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { FaRocket } from 'react-icons/fa';

import Panel from '../../../components/Panel';
import ItemList from '../../../components/ItemList';
import Button from '../../../components/Button';

import { isDomAvailable } from '../../../lib/device';

import GEOJSON_MONTES_CLAROS_POLYGON from '../../../../tests/fixtures/geojson/montes-claros-mg-brazil';
import GEOJSON_GRAO_MOGOL_POLYGON from '../../../../tests/fixtures/geojson/grao-mogol-mg-brazil';

// Lens lets us pass in a component for our Sidebar. The component
// takes a few props as arguments such as the given results and some
// actions that allow us to create a unique sidebar experience for
// whatever app thats getting built

let customMapFeatureGroup;

if (isDomAvailable()) {
  customMapFeatureGroup = new L.FeatureGroup();
}

const EarthSearchSidebarPanels = ({
  geoSearch = {},
  geoFilters = {},
  map = {}
}) => {
  const {
    results = {},
    search,
    searchPlacename,
    loadMoreResults,
    clearSearch
  } = geoSearch;
  const { features, hasResults, hasMoreResults, numberOfResults } = results;

  const { filters, clearActiveFilters } = geoFilters;

  const { addShapeToMap, clearLayers, enableDrawTool } = map;

  function handleLoadMore (e) {
    if (hasMoreResults) {
      loadMoreResults(e);
    }
  }

  function handleClearFilters () {
    if (typeof clearActiveFilters === 'function') {
      clearActiveFilters({
        resetToDefault: true
      });
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

  function handleAddShapeToMap (geoJson, featureGroup) {
    addShapeToMap({
      panToShape: true,
      geoJson,
      zoom: 4,
      clearOtherLayers: false,
      featureGroup
    });
  }

  function handleClearShapes (featureGroup) {
    clearLayers({
      featureGroup
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
            <p>
              <button onClick={() => enableDrawTool({ name: 'marker' })}>
                Enable Marker
              </button>
            </p>
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
                },
                {
                  label: 'Grao Mogol, MG - Polygon, Zoom Auto',
                  onClick: () => {
                    search({
                      geoJson: GEOJSON_GRAO_MOGOL_POLYGON,
                      filters: [],
                      zoom: 'auto'
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

        <h4 className="flat-bottom">Add a Shape to Map</h4>
        <p>
          <Button
            onClick={() => handleAddShapeToMap(GEOJSON_MONTES_CLAROS_POLYGON)}
          >
            Trigger Montes Claros
          </Button>
        </p>
        <p>
          <Button
            onClick={() => handleAddShapeToMap(GEOJSON_GRAO_MOGOL_POLYGON)}
          >
            Trigger Grão Mogol
          </Button>
        </p>
        <p>
          <Button onClick={() => handleClearShapes()}>Clear Shapes</Button>
        </p>

        <h4 className="flat-bottom">
          Add a Shape to Map with Custom Feature Group
        </h4>
        <p>
          <Button
            onClick={() =>
              handleAddShapeToMap(
                GEOJSON_MONTES_CLAROS_POLYGON,
                customMapFeatureGroup
              )
            }
          >
            Trigger Montes Claros
          </Button>
        </p>
        <p>
          <Button
            onClick={() =>
              handleAddShapeToMap(
                GEOJSON_GRAO_MOGOL_POLYGON,
                customMapFeatureGroup
              )
            }
          >
            Trigger Grão Mogol
          </Button>
        </p>
        <p>
          <Button onClick={() => handleClearShapes(customMapFeatureGroup)}>
            Clear Shapes
          </Button>
        </p>
      </Panel>
    </>
  );
};

EarthSearchSidebarPanels.propTypes = {
  geoSearch: PropTypes.object,
  geoFilters: PropTypes.object,
  map: PropTypes.object
};

export default EarthSearchSidebarPanels;
