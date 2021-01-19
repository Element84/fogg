import React from 'react';
import PropTypes from 'prop-types';
import { Polygon } from 'react-leaflet';

import { useLayers } from '../../hooks';
import { LayersContext } from '../../context';

import Logger from '../../lib/logger';
import { isDomAvailable } from '../../lib/device';
import {
  geoJsonFromLatLn,
  latLngFromGeoJson,
  geometryTypeFromGeoJson,
  coordinatesFromGeoJson,
  getGeoJsonCenter
} from '../../lib/map';

import Map from '../Map';
import Marker from '../MapMarker';
import MapDraw from '../MapDraw';

const logger = new Logger('FormInput', {
  isBrowser: true
});

const AVAILABLE_COLORS = ['blue', 'red', 'green'];

const MapPreview = ({
  center,
  geoJson,
  zoom = 3,
  availableLayers,
  availableServices,
  projection,
  fetchLayerData,
  fitGeoJson = true
}) => {
  const layers = useLayers(availableLayers, fetchLayerData);

  if (!center && !geoJson) {
    logger.warn(
      'Could not find location data when attempting to render MapPreview'
    );
    return null;
  }

  if (!isDomAvailable()) {
    return (
      <figure className="map-preview">
        <p className="map-loading">Loading map...</p>
      </figure>
    );
  }

  // Create a geoJson document for the center of our map

  let centerGeoJson = center && geoJsonFromLatLn(center);

  // If we don't have a user provided center and have a geoJson
  // doc passed in from the user, use the geoJson to calculate
  // the center of all points to determine our center

  if (!centerGeoJson && geoJson) {
    centerGeoJson = getGeoJsonCenter(geoJson);
  }

  // If we don't have a user provided geoJson but we do have our
  // center document, use that as our geoJson

  if (!geoJson && centerGeoJson) {
    geoJson = centerGeoJson;
  }

  const { features = [] } = geoJson;

  const centerLatLng = latLngFromGeoJson(centerGeoJson)[0] || {};
  const type = geometryTypeFromGeoJson(geoJson)[0] || {};
  let geoJsonLatLng;
  let geoJsonCoordinates;

  if (type === 'Point') {
    geoJsonLatLng = latLngFromGeoJson(geoJson)[0] || {};
    geoJsonCoordinates = [geoJsonLatLng.lat, geoJsonLatLng.lng];
  } else if (type === 'Polygon') {
    let aoiFeatures = geoJson.features.filter(
      ({ properties }) => properties.featureType === 'aoi'
    );

    if (aoiFeatures.length === 0) {
      aoiFeatures = geoJson.features;
    }

    geoJsonCoordinates = coordinatesFromGeoJson({
      type: 'FeatureCollection',
      features: aoiFeatures
    });
  }

  if (!type) {
    throw new Error('Invalid geometry type');
  }

  // We want to allow someone to enable or disable but also simply set
  // to true by default to use the available geojson

  if (fitGeoJson === true && typeof geoJson === 'object') {
    fitGeoJson = geoJson;
  }

  // Determine the primary AOI from the geoJson

  let aoiFeature = features.filter(
    ({ properties }) => properties.featureType === 'aoi'
  );

  aoiFeature = aoiFeature && aoiFeature[0];

  // If we don't have a specified AOI, grab the first feautre

  if (!aoiFeature) {
    aoiFeature = features[0];
  }

  const aoiType = aoiFeature.geometry.type;

  const mapSettings = {
    center: [centerLatLng.lat, centerLatLng.lng],
    services: availableServices,
    zoom,
    projection,
    fitGeoJson
  };

  return (
    <LayersContext.Provider value={{ ...layers }}>
      <figure className="map-preview">
        <Map {...mapSettings}>
          <MapDraw disableEditControls={true}>
            {features.map((feature) => {
              const { geometry, properties } = feature;

              const {
                shapeOptions = {},
                onClick,
                onMouseover,
                onMouseout
              } = properties;

              const { style = {} } = shapeOptions;

              const featureProps = {
                ...style,
                onClick,
                onMouseover,
                onMouseout
              };

              if (geometry.type === 'Point') {
                const latLngs = latLngFromGeoJson(feature);

                return latLngs.map(({ lat, lng }, index) => {
                  return (
                    <Marker
                      key={`${lat}-${lng}-${index}`}
                      position={[lat, lng]}
                      {...featureProps}
                    />
                  );
                });
              }

              if (geometry.type === 'Polygon') {
                const coordinates = coordinatesFromGeoJson({
                  type: 'FeatureCollection',
                  features: [feature]
                });

                return coordinates.map((set) => {
                  return set.map((position, index) => {
                    const fixedPosition = position.map((coordinates) => [
                      coordinates[1],
                      coordinates[0]
                    ]);
                    return (
                      <Polygon
                        key={`${coordinates[0]}-${coordinates[1]}-${index}`}
                        color={AVAILABLE_COLORS[index]}
                        positions={fixedPosition}
                        {...featureProps}
                      />
                    );
                  });
                });
              }

              return null;
            })}
          </MapDraw>
        </Map>
        <figcaption>
          <p className="map-preview-area-of-interest">
            <strong>Area of Interest</strong>
          </p>
          <p className="map-preview-geometry">
            <strong>Geometry:</strong> {aoiType}
          </p>
          <div className="map-preview-coordinates">
            <p>
              <strong>Coordinates:</strong>
              {aoiType === 'Point' && (
                <>
                  {/* Add an extra space to prevent a single coordinate from bumping against */}{' '}
                  <span className="map-preview-coordinates-item">
                    {geoJsonLatLng.lat} &deg;N, {geoJsonLatLng.lng} &deg;W
                  </span>
                </>
              )}
            </p>
            {aoiType === 'Polygon' &&
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
    </LayersContext.Provider>
  );
};

const LayerProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  serviceName: PropTypes.string,
  defaultIsVisible: PropTypes.bool
});

MapPreview.propTypes = {
  center: PropTypes.object,
  geoJson: PropTypes.object,
  zoom: PropTypes.number,
  availableLayers: PropTypes.oneOfType([
    PropTypes.arrayOf(LayerProps).isRequired,
    PropTypes.shape({
      base: PropTypes.arrayOf(LayerProps).isRequired,
      overlay: PropTypes.arrayOf(LayerProps)
    })
  ]),
  availableServices: PropTypes.array,
  projection: PropTypes.string,
  fetchLayerData: PropTypes.func,
  fitGeoJson: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};

export default MapPreview;
