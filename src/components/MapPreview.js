import React from 'react';
import PropTypes from 'prop-types';
import { Polygon } from 'react-leaflet';

import Logger from '../lib/logger';
import { geoJsonFromLatLn } from '../lib/leaflet';

import Map from './Map';
import Marker from './MapMarker';
import MapDraw from './MapDraw';

const logger = new Logger('FormInput', {
  isBrowser: true
});

const MapPreview = ({ center = {}, geoJson, zoom = 3 }) => {
  const { lat = 0, lng = 0 } = center;

  if (!lat && !lng && !geoJson) {
    logger.warn(`Could not find location data when rendering MapPreview`);
  }

  if (!geoJson) {
    geoJson = geoJsonFromLatLn(center);
  }

  const { features = [] } = geoJson;
  const firstFeature = features[0];
  const { geometry = {} } = firstFeature;
  const { type } = geometry;
  const { coordinates = [] } = geometry;

  const mapSettings = {
    // TODO: make center based off of geojson
    center: [lat, lng],
    zoom
  };

  return (
    <figure className="map-preview">
      <Map {...mapSettings}>
        <MapDraw disableEditControls={true}>
          {type === 'Point' && <Marker position={[lat, lng]} />}
          {type === 'Polygon' &&
            coordinates.map((position, index) => {
              const fixedPosition = position.map(coordinates => [
                coordinates[1],
                coordinates[0]
              ]);
              return (
                <Polygon
                  key={`MapPreview-Polygon-${index}`}
                  color="blue"
                  positions={fixedPosition}
                />
              );
            })}
        </MapDraw>
      </Map>
      <figcaption>
        <p className="map-preview-area-of-interest">
          <strong>Area of Interest</strong>
        </p>
        <p className="map-preview-geometry">
          <strong>Geometry:</strong> {type}
        </p>
        <div className="map-preview-coordinates">
          <p>
            <strong>Coordinates:</strong>
            {type === 'Point' && (
              <>
                {/* Add an extra space to prevent a single coordinate from bumping against */}
                {` `}
                <span className="map-preview-coordinates-item">
                  {lat} &deg;N, {lng} &deg;W
                </span>
              </>
            )}
          </p>
          {type === 'Polygon' && (
            <ul>
              {coordinates[0].map(([posLng, posLat], index) => {
                return (
                  <li key={`MapPreview-Coordinates-${index}`}>
                    {posLat} &deg;N, {posLng} &deg;W
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </figcaption>
    </figure>
  );
};

MapPreview.propTypes = {
  center: PropTypes.object,
  geoJson: PropTypes.object,
  zoom: PropTypes.number
};

export default MapPreview;
