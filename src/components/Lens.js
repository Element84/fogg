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
  className,
  defaultCenter = {},
  zoom = 4,
  maxZoom,
  minZoom,
  SidebarComponents,
  resolveOnSearch,
  projection,
  availableServices,
  search = true,
  placeholder = 'Search',
  availableFilters,
  availableLayers = null,
  hideNativeLayers = false,
  fetchLayerData,
  disableMapDraw,
  useMapEffect
}) => {
  const refMapDraw = createRef();
  let lensClassName = 'lens';

  if (className) {
    lensClassName = `${lensClassName} ${className}`;
  }

  const lens = useLens({
    availableFilters,
    defaultCenter,
    resolveOnSearch,
    refMapDraw,
    availableLayers,
    fetchLayerData
  });

  const {
    mapConfig,
    results,
    clearSearchInput,
    filters,
    layers,
    handlers: lensHandlers
  } = lens;

  const { handlers: filtersHandlers } = filters;
  const { handlers: layersHandlers } = layers;

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

  const { toggleLayer, getDataForLayers } = layersHandlers;

  const { center = {}, geoJson } = mapConfig || {};
  const { lat = 0, lng = 0 } = center;

  const activeSearch = Array.isArray(results);
  const hasResults = Array.isArray(results) && results.length > 0;
  const position = [lat, lng];

  const mapSettings = {
    center: position,
    zoom,
    maxZoom,
    minZoom,
    projection,
    services: availableServices,
    layers,
    toggleLayer,
    hideNativeLayers,
    useMapEffect
  };

  useEffect(() => {
    handleQueryParams();
  }, []);

  return (
    <div
      className={lensClassName}
      data-active-search={activeSearch}
      data-has-results={hasResults}
    >
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
                defaultDate={mapConfig.date}
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
            layers={layers}
            toggleLayer={toggleLayer}
            getDataForLayers={getDataForLayers}
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
        {!disableMapDraw && (
          <MapDraw ref={refMapDraw} onCreated={handleOnCreated} />
        )}
      </Map>

      <div className="lens-extensions">{children}</div>
    </div>
  );
};

const LayerProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  serviceName: PropTypes.string,
  defaultIsVisible: PropTypes.bool
});

Lens.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultCenter: PropTypes.object,
  zoom: PropTypes.number,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  SidebarComponents: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  resolveOnSearch: PropTypes.func,
  availableLayers: PropTypes.oneOfType([
    PropTypes.arrayOf(LayerProps).isRequired,
    PropTypes.shape({
      base: PropTypes.arrayOf(LayerProps).isRequired,
      overlay: PropTypes.arrayOf(LayerProps).isRequired
    })
  ]),
  availableServices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      format: PropTypes.string,
      attribution: PropTypes.string,
      projections: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.arrayOf(PropTypes.string.isRequired)
      ]).isRequired,
      maxZoom: PropTypes.number,
      nativeZoom: PropTypes.number,
      tileSize: PropTypes.number,
      resolution: PropTypes.string
    }).isRequired
  ),
  projection: PropTypes.string,
  search: PropTypes.bool,
  placeholder: PropTypes.string,
  availableFilters: PropTypes.array,
  hideNativeLayers: PropTypes.bool,
  fetchLayerData: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func)
  ]),
  disableMapDraw: PropTypes.bool,
  useMapEffect: PropTypes.func
};

export default Lens;
