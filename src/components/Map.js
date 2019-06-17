import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css'; // This needs to be included for the map to actually work when compiled
import L from 'leaflet';
import 'proj4';
import 'proj4leaflet';
import { Map as BaseMap, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet-active-area';

import MapService from '../models/map-service';

import { isDomAvailable } from '../lib/util';

const Map = ({
  children,
  className,
  map = 'blue_marble',
  center = [0, 0],
  zoom = 2,
  projections = [],
  services = [],
  useMapEffect
}) => {
  return null;

  const mapClassName = `map ${className || ''}`;
  let projection;

  const mapRef = createRef();

  useEffect(() => {
    if (!isDomAvailable()) return;
    const { current = {} } = mapRef;
    const { leafletElement = {} } = current;
    if (typeof useMapEffect === 'function') {
      useMapEffect({
        leafletElement
      });
    }
  }, [map, mapRef]);

  if (!isDomAvailable()) {
    return (
      <div className={mapClassName}>
        <p className="map-loading">Loading map...</p>
      </div>
    );
  }

  // Set up a new map service given the name of the map

  const service = new MapService(map, {
    services,
    projections
  });

  // Construct a CRS projection given the service properties

  if (service.crs) {
    projection = new L.Proj.CRS(service.crs.code, service.crs.definition, {
      origin: service.crs.origin,
      resolutions: service.crs.resolutions,
      bounds: L.Bounds(service.crs.bounds)
    });
  }

  const mapSettings = {
    className: 'map-base',
    center,
    zoom,
    zoomControl: false
  };

  if (projection) {
    mapSettings.crs = projection;
  }

  const tileSettings = {
    bounds: [[-89.9999, -179.9999], [89.9999, 179.9999]],
    continuousWorld: true,
    noWrap: true
  };

  if (service.attribution) {
    tileSettings.attribution = service.attribution;
  }

  if (service.tileSize) {
    tileSettings.tileSize = service.tileSize;
  }

  if (service.tile) {
    tileSettings.url = service.tile;
  }

  return (
    <div className={mapClassName}>
      <BaseMap ref={mapRef} {...mapSettings}>
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
  className: PropTypes.string,
  projections: PropTypes.array,
  services: PropTypes.array,
  useMapEffect: PropTypes.func
};

export default Map;
