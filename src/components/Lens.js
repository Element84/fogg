import React, { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useLens } from '../hooks';

import Map from './Map';
import MapDraw from './MapDraw';
import Panel from './Panel';
import SearchComplete from './SearchComplete';
import SearchFilters from './SearchFilters';
import SearchPanelFilters from './SearchPanelFilters';

const Lens = ({
  children,
  defaultCenter = {},
  zoom = 4,
  SidebarComponents,
  resolveOnSearch,
  services,
  map = 'blue_marble',
  search = true,
  placeholder = 'Search',
  availableFilters,
  useMapEffect
}) => {
  const refMapDraw = createRef();

  const lens = useLens({
    availableFilters,
    defaultCenter,
    resolveOnSearch,
    refMapDraw
  });

  const {
    mapConfig,
    results,
    clearSearchInput,
    filters,
    handlers: lensHandlers
  } = lens;
  const { handlers: filtersHandlers } = filters;

  const {
    handleOnCreated,
    handleOnSearch,
    resolveLensAutocomplete,
    loadMoreResults,
    handleQueryParams,
    clearActiveSearch,
    handleUpdateSearchParams
  } = lensHandlers;

  const {
    openFilters,
    storeFilterChanges,
    cancelFilterChanges
  } = filtersHandlers;

  const { center, geoJson } = mapConfig || {};
  const { lat = 0, lng = 0 } = center;

  const activeSearch = Array.isArray(results);
  const hasResults = Array.isArray(results) && results.length > 0;
  const position = [lat, lng];

  const mapSettings = {
    center: position,
    zoom,
    services,
    map,
    useMapEffect
  };

  useEffect(() => {
    handleQueryParams();
  }, []);

  return (
    <div className="lens" data-has-results={hasResults}>
      <div className="lens-sidebar">
        {search && (
          <div className="lens-sidebar-search">
            <Panel className="panel-clean">
              <SearchComplete
                onSearch={handleOnSearch}
                resolveQueryComplete={resolveLensAutocomplete}
                placeholder={placeholder}
                defaultValue={mapConfig.textInput}
                clearSearchInput={clearSearchInput}
              />
            </Panel>

            {activeSearch && filters.available.length > 0 && (
              <SearchPanelFilters
                filters={filters}
                onOpenFilters={openFilters}
                onSaveFiltersChanges={handleUpdateSearchParams}
                onCancelFilterChanges={cancelFilterChanges}
              />
            )}
          </div>
        )}

        {SidebarComponents && (
          <SidebarComponents
            filters={filters}
            results={results}
            loadMoreResults={loadMoreResults}
            clearActiveSearch={clearActiveSearch}
            mapPosition={position}
            geoJson={geoJson}
          />
        )}
      </div>

      {activeSearch && filters.isOpen && filters.available.length > 0 && (
        <SearchFilters
          className="lens-search-filters"
          filters={filters.available}
          onCancelChanges={cancelFilterChanges}
          onSaveChanges={handleUpdateSearchParams}
          onUpdateChanges={storeFilterChanges}
        />
      )}

      <Map className="lens-map" {...mapSettings}>
        <MapDraw ref={refMapDraw} onCreated={handleOnCreated} />
      </Map>

      <div className="lens-extensions">{children}</div>
    </div>
  );
};

Lens.propTypes = {
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
  availableFilters: PropTypes.array,
  useMapEffect: PropTypes.func
};

export default Lens;
