import React from 'react';
import PropTypes from 'prop-types';
import 'proj4';
import 'proj4leaflet';
import 'leaflet/dist/leaflet.css'; // This needs to be included for the map to actually work when compiled
import L from 'leaflet';
import { Map as BaseMap, TileLayer, ZoomControl } from 'react-leaflet';

import MapService from '../models/map-service';

const Map = ({
  children,
  className,
  map = 'blue_marble',
  center = [0, 0],
  zoom = 2
}) => {
  const mapClassName = `map ${className || ''}`;

  if (typeof window === 'undefined') {
    return (
      <div className={mapClassName}>
        <p className="map-loading">Loading map...</p>
      </div>
    );
  }

  // Set up a new map service given the name of the map

  const service = new MapService(map);

  // Construct a CRS projection given the service properties

  const projection = new L.Proj.CRS(service.crs.code, service.crs.definition, {
    origin: service.crs.origin,
    resolutions: service.crs.resolutions,
    bounds: L.Bounds(service.crs.bounds)
  });

  const mapSettings = {
    className: 'map-base',
    crs: projection,
    center,
    zoom,
    zoomControl: false
  };

  const tileSettings = {
    attribution: service.attribution,
    url: service.tile,
    bounds: [[-89.9999, -179.9999], [89.9999, 179.9999]],
    tileSize: service.tileSize,
    continuousWorld: true,
    noWrap: true
  };

  return (
    <div className={mapClassName}>
      <BaseMap {...mapSettings}>
        {children}
        <TileLayer {...tileSettings} />
        <ZoomControl position="bottomright" />
      </BaseMap>
    </div>
  );
};

Map.propTypes = {
  center: PropTypes.array,
  children: PropTypes.node,
  map: PropTypes.string,
  zoom: PropTypes.number,
  className: PropTypes.string
};

export default Map;
