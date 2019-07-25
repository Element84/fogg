import React from 'react';
import PropTypes from 'prop-types';
import { Polygon } from 'react-leaflet';
import { center as turfCenter } from '@turf/turf';

import Logger from '../lib/logger';
import {
  geoJsonFromLatLn,
  latLngFromGeoJson,
  geometryTypeFromGeoJson,
  coordinatesFromGeoJson
} from '../lib/leaflet';

import Map from './Map';
import Marker from './MapMarker';
import MapDraw from './MapDraw';

const logger = new Logger('FormInput', {
  isBrowser: true
});

const AVAILABLE_COLORS = ['blue', 'red', 'green'];

const MapPreview = ({ center, geoJson, zoom = 3 }) => {
  if (!center && !geoJson) {
    logger.warn(
      `Could not find location data when attempting to render MapPreview`
    );
    return null;
  }

  // Create a geoJson document for the center of our map

  let centerGeoJson = center && geoJsonFromLatLn(center);

  // If we don't have a user provided center and have a geoJson
  // doc passed in from the user, use the geoJson to calculate
  // the center of all points to determine our center

  if (!centerGeoJson && geoJson) {
    centerGeoJson = turfCenter(geoJson);
  }

  // If we don't have a user provided geoJson but we do have our
  // center document, use that as our geoJson

  if (!geoJson && centerGeoJson) {
    geoJson = centerGeoJson;
  }

  const centerLatLng = latLngFromGeoJson(centerGeoJson)[0] || {};
  const type = geometryTypeFromGeoJson(geoJson)[0] || {};
  let geoJsonLatLng;
  let geoJsonCoordinates;

  if (type === 'Point') {
    geoJsonLatLng = latLngFromGeoJson(geoJson)[0] || {};
    geoJsonCoordinates = [geoJsonLatLng.lat, geoJsonLatLng.lng];
  } else if (type === 'Polygon') {
    geoJsonCoordinates = coordinatesFromGeoJson(geoJson);
  }

  if (!type) {
    throw new Error('Invalid geometry type');
  }

  const mapSettings = {
    center: [centerLatLng.lat, centerLatLng.lng],
    zoom
  };

  return (
    <figure className="map-preview">
      <Map {...mapSettings}>
        <MapDraw disableEditControls={true}>
          {type === 'Point' && <Marker position={geoJsonCoordinates} />}
          {type === 'Polygon' &&
            geoJsonCoordinates.map((set = []) => {
              return set.map((position, index) => {
                const fixedPosition = position.map(coordinates => [
                  coordinates[1],
                  coordinates[0]
                ]);
                return (
                  <Polygon
                    key={`MapPreview-Polygon-${index}`}
                    color={AVAILABLE_COLORS[index]}
                    positions={fixedPosition}
                  />
                );
              });
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
                  {geoJsonLatLng.lat} &deg;N, {geoJsonLatLng.lng} &deg;W
                </span>
              </>
            )}
          </p>
          {type === 'Polygon' &&
            geoJsonCoordinates.map((set = [], coordinatesIndex) => {
              return (
                <ul key={`MapPreview-Coordinates-${coordinatesIndex}`}>
                  {set.map((positions = []) => {
                    return positions.map(([posLng, posLat], setIndex) => {
                      return (
                        <li key={`MapPreview-Coordinates-${setIndex}`}>
                          {posLat} &deg;N, {posLng} &deg;W
                        </li>
                      );
                    });
                  })}
                </ul>
              );
            })}
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
