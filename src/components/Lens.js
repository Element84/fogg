import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import { useLens, useLayers } from '../hooks';
import { LensContext, LayersContext } from '../context';

import Panel from './Panel';
import LensMap from './LensMap';
import LensMapDraw from './LensMapDraw';
import LensSearchComplete from './LensSearchComplete';
import LensSearchFilters from './LensSearchFilters';
import LensSearchPanelFilters from './LensSearchPanelFilters';
import LensSidebarComponents from './LensSidebarComponents';
import LensSearchDate from './LensSearchDate';

const Lens = ({
  children,
  className,
  defaultCenter = {},
  zoom = 4,
  defaultZoom = 4,
  SidebarComponents,
  resolveOnSearch,
  projection,
  availableServices,
  search = true,
  searchType,
  placeholder = 'Search',
  availableFilters,
  availableLayers = null,
  hideNativeLayers = false,
  fetchLayerData,
  disableMapDraw,
  useMapEffect,
  hasFilterCancel = true
}) => {
  const refMap = createRef();
  const refMapDraw = createRef();
  const refSearchComplete = createRef();

  let lensClassName = 'lens';

  if (className) {
    lensClassName = `${lensClassName} ${className}`;
  }

  const lens = useLens({
    availableFilters,
    defaultCenter,
    resolveOnSearch,
    refMap,
    refMapDraw,
    refSearchComplete,
    zoom,
    defaultZoom
  });

  const layers = useLayers(availableLayers, fetchLayerData);

  const { results, filters } = lens;

  const activeSearch = Array.isArray(results);
  const hasResults = Array.isArray(results) && results.length > 0;
  const displayFilters =
    activeSearch && filters.isOpen && filters.available.length > 0;

  const mapSettings = {
    projection,
    services: availableServices,
    hideNativeLayers,
    useMapEffect
  };

  return (
    <LensContext.Provider value={{ lens, filters, layers }}>
      <LayersContext.Provider value={{ ...layers }}>
        <div
          className={lensClassName}
          data-active-search={activeSearch}
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
                          <LensSearchDate />
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
                          </Panel>

                          {activeSearch && filters.available.length > 0 && (
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

          <LensMap ref={refMap} {...mapSettings}>
            {!disableMapDraw && <LensMapDraw ref={refMapDraw} />}
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
  availableFilters: PropTypes.array,
  hideNativeLayers: PropTypes.bool,
  fetchLayerData: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func)
  ]),
  disableMapDraw: PropTypes.bool,
  useMapEffect: PropTypes.func,
  hasFilterCancel: PropTypes.bool
};

export default Lens;
