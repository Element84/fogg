import L from 'leaflet';
import { geocode } from 'esri-leaflet-geocoder';
import PromiseCancelable from 'p-cancelable';

const DRAW_SHAPES = ['polygon', 'rectangle'];

const SHAPE_TO_GEOTYPE_MAP = {
  marker: 'Point',
  polygon: 'Polygon',
  rectangle: 'Polygon'
};

/**
 * clearLeafletElementLayers
 * @description
 */

export function clearLeafletElementLayers (leafletElement, excludeIds = []) {
  const layers = leafletElement.getLayers();
  const layersToRemove = layers.filter(
    layer => !excludeIds.includes(layer._leaflet_id)
  );

  layersToRemove.forEach(layer => leafletElement.removeLayer(layer));
}

/**
 * getShapeType
 * @see https://stackoverflow.com/a/25082568/844780
 */

export function getShapeType (layer) {
  if (layer instanceof L.Circle) {
    return 'circle';
  }

  if (layer instanceof L.Marker) {
    return 'marker';
  }

  if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
    return 'polyline';
  }

  if (layer instanceof L.Polygon && !(layer instanceof L.Rectangle)) {
    return 'polygon';
  }

  if (layer instanceof L.Rectangle) {
    return 'rectangle';
  }
}

/**
 * reduceDrawEventToLayer
 * @description Extracts needed layer attributes from given event
 */

export function reduceDrawEventToLayer ({ layer, layerType } = {}) {
  // If we don't have a layer, there's really nothing to grab

  if (!layer) return {};

  const data = {
    id: layer._leaflet_id,
    layerType
  };

  let coordinates;
  let center;
  let geoJson;

  // Grab the coordinates and center based on the type of layer
  // Shapes have different methods than markers

  if (DRAW_SHAPES.includes(layerType)) {
    center = layer.getCenter();
  } else if (layerType === 'marker') {
    coordinates = [{ ...layer.getLatLng() }];
    center = coordinates[0];
  }

  // Further reduce data to pure objects
  coordinates = coordinatesFromLayer(layer);
  center = center && { ...center };
  geoJson = geoJsonFromLayer(layer);

  return {
    ...data,
    coordinates,
    center,
    geoJson
  };
}

/**
 * coordinatesFromLayer
 * @description
 */

export function coordinatesFromLayer (layer = {}) {
  let coordinates = [];
  const shape = getShapeType(layer);

  if (DRAW_SHAPES.includes(shape)) {
    coordinates = layer.getLatLngs();
    coordinates = coordinates && coordinates[0];
  } else if (shape === 'marker') {
    coordinates = [{ ...layer.getLatLng() }];
  }

  return coordinates.map((coordinate = {}) => ({ ...coordinate }));
}

/**
 * geoJsonFromLayer
 * @description
 */

export function geoJsonFromLayer (layer) {
  const shape = getShapeType(layer);
  const type = SHAPE_TO_GEOTYPE_MAP[shape];
  const coordinates = coordinatesFromLayer(layer);

  let geoCoordinates = [];

  if (type === 'Point') {
    geoCoordinates.push(coordinates[0].lng, coordinates[0].lat);
  } else if (type === 'Polygon') {
    geoCoordinates.push(
      coordinates.map(({ lat, lng }) => {
        return [lng, lat];
      })
    );
  }

  return {
    type,
    coordinates: geoCoordinates
  };
}

/**
 * geoJsonFromLatLn
 * @description
 */

export function geoJsonFromLatLn ({ lat = 0, lng = 0 }) {
  return {
    type: 'Point',
    coordinates: [lng, lat]
  };
}

/**
 * geocodePlacename
 * @description Promise that performs a geocode request on the given placename
 */

export function geocodePlacename (placename) {
  return new PromiseCancelable((resolve, reject, onCancel) => {
    const request = geocode()
      .text(placename)
      .run((error, body, response) => {
        if (error) reject(error);
        resolve(response);
      }, this);

    onCancel(() => {
      request.abort();
    });
  });
}
