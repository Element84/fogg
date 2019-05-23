import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

import { useAtlas, useFilters } from '../hooks';

import Map from './Map';
import MapDraw from './MapDraw';
import Panel from './Panel';
import SearchComplete from './SearchComplete';
import SearchFilters from './SearchFilters';
import Button from './Button';

const Atlas = ({
  children,
  defaultCenter = {},
  zoom = 4,
  SidebarComponents,
  resolveOnSearch,
  services,
  map = 'blue_marble',
  search = true,
  placeholder = 'Search',
  availableFilters
}) => {
  const refMapDraw = createRef();

  const atlas = useAtlas({
    defaultCenter,
    resolveOnSearch,
    refMapDraw
  });

  const { mapConfig, results, handlers } = atlas;

  const {
    handleOnCreated,
    handleOnSearch,
    resolveAtlasAutocomplete,
    loadMoreResults
  } = handlers;

  const {
    filters,
    openFilters,
    storeFilterChanges,
    saveFilterChanges,
    cancelFilterChanges
  } = useFilters(availableFilters);

  const { center } = mapConfig || {};
  const { lat = 0, lng = 0 } = center;

  const hasResults = Array.isArray(results) && results.length > 0;
  const position = [lat, lng];

  const FilterActions = () => {
    return (
      <ul>
        {!filters.isOpen && filters.active.length === 0 && (
          <li>
            <Button onClick={openFilters}>
              <span className="visually-hidden">Add Filter</span>
              <FaPlus />
            </Button>
          </li>
        )}
        {!filters.isOpen && filters.active.length > 0 && (
          <li>
            <Button onClick={openFilters}>
              <span className="visually-hidden">Edit Filters</span>
              <FaEdit />
            </Button>
          </li>
        )}
        {filters.isOpen && (
          <>
            <li>
              <Button onClick={saveFilterChanges}>
                <span className="visually-hidden">Save Filter Changes</span>
                <FaCheck />
              </Button>
            </li>
            <li>
              <Button onClick={cancelFilterChanges}>
                <span className="visually-hidden">Cancel Filter Changes</span>
                <FaTimes />
              </Button>
            </li>
          </>
        )}
      </ul>
    );
  };

  const mapSettings = {
    center: position,
    zoom,
    services,
    map
  };

  return (
    <div className="atlas" data-has-results={hasResults}>
      <div className="atlas-sidebar">
        {search && (
          <div className="atlas-sidebar-search">
            <Panel className="panel-clean">
              <SearchComplete
                onSearch={handleOnSearch}
                resolveQueryComplete={resolveAtlasAutocomplete}
                placeholder={placeholder}
              />
            </Panel>

            {hasResults && filters.available.length > 0 && (
              <Panel header="Filters" actions={<FilterActions />} />
            )}
          </div>
        )}

        {SidebarComponents && (
          <SidebarComponents
            results={results}
            loadMoreResults={loadMoreResults}
            mapPosition={position}
          />
        )}
      </div>

      {hasResults && filters.isOpen && filters.available.length > 0 && (
        <SearchFilters
          className="atlas-search-filters"
          filters={filters.available}
          onCancelChanges={cancelFilterChanges}
          onSaveChanges={saveFilterChanges}
          onUpdateChanges={storeFilterChanges}
        />
      )}

      <Map className="atlas-map" {...mapSettings}>
        <MapDraw ref={refMapDraw} onCreated={handleOnCreated} />
      </Map>

      <div className="atlas-extensions">{children}</div>
    </div>
  );
};

Atlas.propTypes = {
  children: PropTypes.node,
  defaultCenter: PropTypes.object,
  zoom: PropTypes.number,
  SidebarComponents: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  resolveOnSearch: PropTypes.func,
  map: PropTypes.string,
  projections: PropTypes.array,
  services: PropTypes.array,
  search: PropTypes.bool,
  placeholder: PropTypes.string,
  availableFilters: PropTypes.array
};

export default Atlas;
