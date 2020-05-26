import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import { useLayers, useGeoSearch, useMap, useGeoFilters } from '../../hooks';
import { LensContext, LayersContext } from '../../context';

import { resolveLensAutocomplete } from '../../lib/lens';

import Panel from '../Panel';
import LensMap from '../LensMap';
import LensMapDraw from '../LensMapDraw';
import LensSearchComplete from '../LensSearchComplete';
import LensSearchFilters from '../LensSearchFilters';
import LensSearchPanelFilters from '../LensSearchPanelFilters';
import LensSidebarComponents from '../LensSidebarComponents';
import LensSearchDate from '../LensSearchDate';
import Button from '../Button';
import IconByName from '../IconByName';

const Lens = ({
  children,
  className,
  draw,
  defaultCenter = {},
  defaultZoom = 4,
  maxZoom,
  minZoom,
  SidebarComponents,
  resolveOnSearch,
  projection,
  availableServices,
  search = true,
  searchType,
  placeholder = 'Search',
  availableFilters,
  showFilters = true,
  availableLayers = null,
  hideNativeLayers = true,
  fetchLayerData,
  useMapEffect,
  hasFilterCancel = true,
  activeDateRange = {},
  defaultDateRange = {},
  PopupContent,
  disableFutureDates = false,
  resolveOnAutocomplete = resolveLensAutocomplete,
  utc = false,
  geoSearch: geoSearchSettings = {
    placenameShape: 'marker',
    ignoreDatetime: true
  },
  searchActions = []
}) => {
  const refSearchComplete = createRef();

  let lensClassName = 'lens';

  if (className) {
    lensClassName = `${lensClassName} ${className}`;
  }

  const layers = useLayers(availableLayers, fetchLayerData);

  const geoFilters = useGeoFilters({
    available: availableFilters
  });

  const { filters = {} } = geoFilters;

  const defaultGeoSearchSettings = {
    resolveOnSearch,
    resolveOnAutocomplete,
    filters: filters.active,
    date: defaultDateRange,
    utc,
    ...geoSearchSettings
  };

  const geoSearch = useGeoSearch(defaultGeoSearchSettings);
  const { isActiveSearch = false, results = {}, queryParams = {} } = geoSearch;
  const { hasResults } = results;
  const { date = {} } = queryParams;

  const defaultMapSettings = {
    defaultCenter,
    defaultZoom,
    maxZoom,
    minZoom,
    availableServices,
    projection,
    date,
    draw: {
      searchOnDraw: true,
      clearOnDraw: true,
      ...draw
    }
  };

  const map = useMap(defaultMapSettings) || {};
  const { draw: mapDraw = {} } = map;
  const { disableMapDraw } = mapDraw;

  const displayFilters =
    isActiveSearch && filters.isOpen && filters.available.length > 0;

  const hasSearchActions =
    Array.isArray(searchActions) && searchActions.length > 0;

  const mapSettings = {
    projection,
    hideNativeLayers,
    useMapEffect
  };

  return (
    <LensContext.Provider
      value={{ geoFilters, layers, geoSearch, map, activeDateRange }}
    >
      <LayersContext.Provider value={{ ...layers }}>
        <div
          className={lensClassName}
          data-active-search={isActiveSearch}
          data-has-results={hasResults}
        >
          <div className="lens-sidebar">
            {search && (
              <div className="lens-sidebar-search">
                {(() => {
                  switch (searchType) {
                    case 'daterange':
                      return (
                        <div className="lens-sidebar-date">
                          <LensSearchDate
                            allowFutureDate={!disableFutureDates}
                          />
                        </div>
                      );
                    default:
                      return (
                        <>
                          <Panel className="panel-clean">
                            <LensSearchComplete
                              ref={refSearchComplete}
                              placeholder={placeholder}
                            />
                            {hasSearchActions && (
                              <ul className="lens-sidebar-search-actions">
                                {searchActions.map((action, i) => {
                                  const { label, icon, onClick } = action;
                                  return (
                                    <li key={i}>
                                      <Button onClick={onClick}>
                                        <IconByName name={icon} />
                                        <span className="visually-hidden">
                                          {label}
                                        </span>
                                      </Button>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </Panel>

                          {showFilters &&
                            isActiveSearch &&
                            filters.available.length > 0 && (
                            <LensSearchPanelFilters
                              hasFilterCancel={hasFilterCancel}
                            />
                          )}
                        </>
                      );
                  }
                })()}
              </div>
            )}
            {SidebarComponents && (
              <LensSidebarComponents SidebarComponents={SidebarComponents} />
            )}
          </div>

          {displayFilters && (
            <LensSearchFilters hasFilterCancel={hasFilterCancel} />
          )}

          <LensMap {...mapSettings}>
            {!disableMapDraw && <LensMapDraw PopupContent={PopupContent} />}
          </LensMap>

          <div className="lens-extensions">{children}</div>
        </div>
      </LayersContext.Provider>
    </LensContext.Provider>
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
  draw: PropTypes.object,
  defaultCenter: PropTypes.object,
  zoom: PropTypes.number,
  defaultZoom: PropTypes.number,
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
  searchType: PropTypes.string,
  placeholder: PropTypes.string,
  showFilters: PropTypes.bool,
  availableFilters: PropTypes.array,
  hideNativeLayers: PropTypes.bool,
  fetchLayerData: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func)
  ]),
  useMapEffect: PropTypes.func,
  hasFilterCancel: PropTypes.bool,
  activeDateRange: PropTypes.object,
  defaultDateRange: PropTypes.object,
  utc: PropTypes.bool,
  geoSearch: PropTypes.object,
  searchActions: PropTypes.array,
  /**
   * Content of popup for drawn shapes
   */
  PopupContent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * Determines whether or not the search date range picker allow for selecting future dates
   * If we ever decide that we should never allow future dates, we can remove this option and
   * pass allowFutureDate={false} to LensSearchDate directly
   */
  disableFutureDates: PropTypes.bool,
  resolveOnAutocomplete: PropTypes.func
};

export default Lens;
