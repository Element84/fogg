import React from 'react';
import PropTypes from 'prop-types';

import { useAtlas } from '../hooks';

import Map from './Map';
import MapMarker from './MapMarker';
import MapDraw from './MapDraw';
import Panel from './Panel';
import SearchComplete from './SearchComplete';

const Atlas = ({
  children,
  defaultCenter = {},
  zoom = 4,
  SidebarComponents,
  resolveOnSearch,
  services,
  map = 'blue_marble',
  search = true
}) => {
  const atlas = useAtlas({
    defaultCenter,
    resolveOnSearch
  });

  const { mapConfig, results, handlers } = atlas;
  const {
    handleOnCreated,
    handleOnSearch,
    resolveAtlasAutocomplete
  } = handlers;
  const { center } = mapConfig || {};
  const { lat = 0, lng = 0 } = center;

  const hasResults = Array.isArray(results) && results.length > 0;
  const position = [lat, lng];

  const mapSettings = {
    center: position,
    zoom,
    services,
    map
  };

  const markerSettings = {
    position,
    draggable: false
  };

  return (
    <div className="atlas" data-has-results={hasResults}>
      <div className="atlas-sidebar">
        {search && (
          <Panel className="panel-clean">
            <SearchComplete
              onSearch={handleOnSearch}
              resolveQueryComplete={resolveAtlasAutocomplete}
            />
          </Panel>
        )}

        {SidebarComponents && (
          <SidebarComponents results={results} mapPosition={position} />
        )}
      </div>

      <Map className="atlas-map" {...mapSettings}>
        <MapDraw onCreated={handleOnCreated}>
          <MapMarker {...markerSettings} />
        </MapDraw>
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
  search: PropTypes.bool
};

export default Atlas;
