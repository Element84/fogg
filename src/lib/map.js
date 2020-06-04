import { getGeom, center, bboxPolygon } from '@turf/turf';

/**
 * geoJsonFromLatLn
 * @description Given a lat and long, produce a GeoJSON doc
 */

export function geoJsonFromLatLn ({ lat = 0, lng = 0 }) {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      }
    ]
  };
}

/**
 * latLngFromGeoJson
 * @description Grabs Lat and Lng sets from GeoJSON
 */

export function latLngFromGeoJson (geoJson, type = 'object') {
  const errorBase = 'latLngFromGeoJson - Failed to get lat lng from geoJson';
  const coordinates = coordinatesFromGeoJson(geoJson);

  if (!Array.isArray(coordinates)) {
    throw new Error(`${errorBase}: Invalid coordinates`);
  }

  return coordinates.map((set) => {
    if (type === 'array') {
      return [set[1], set[0]];
    }
    return {
      lng: set[0],
      lat: set[1]
    };
  });
}

/**
 * geometryTypeFromGeoJson
 * @description Grabs the types of geometries available in the GeoJSON
 */

export function geometryTypeFromGeoJson ({ features = [] } = {}) {
  return features.map((feature = {}) => {
    const { type } = getGeom(feature);
    return type;
  });
}

/**
 * coordinatesFromGeoJson
 * @description Grabs the coordinate sets from the GeoJSON
 */

export function coordinatesFromGeoJson (geoJson) {
  const errorBase =
    'coordinatesFromGeoJson - Failed to get coordinates from geoJson';
  let { features } = geoJson;

  // If we don't have any top level features but has a geometry,
  // grab that instead and wrap it in an array for normalization

  if (!features && geoJson.geometry) {
    features = [geoJson.geometry];
  }

  if (!Array.isArray(features)) {
    throw new Error(`${errorBase} - Invalid features`);
  }

  return features.map((feature = {}) => {
    const { coordinates = [] } = getGeom(feature);
    return coordinates;
  });
}

/**
 * getGeoJsonCenter
 * @description
 */

export function getGeoJsonCenter (geoJson) {
  if (!geoJson || !geoJson.type) {
    throw new Error('Failed to get geoJson center: Invalid geoJson type');
  }
  return center(geoJson);
}

/**
 * getGeoJsonFromExtent
 */

export function getGeoJsonFromExtent ({ xmax, xmin, ymax, ymin }) {
  return bboxPolygon([xmin, ymin, xmax, ymax]);
}
