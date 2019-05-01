import L from 'leaflet';
import { geocode } from 'esri-leaflet-geocoder';
import PromiseCancelable from 'p-cancelable';

const DRAW_SHAPES = ['polygon', 'rectangle'];

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

  // Grab the coordinates and center based on the type of layer
  // Shapes have different methods than markers

  if (DRAW_SHAPES.includes(layerType)) {
    coordinates = layer.getLatLngs();
    coordinates = coordinates && coordinates[0];
    center = layer.getCenter();
  } else if (layerType === 'marker') {
    coordinates = [{ ...layer.getLatLng() }];
    center = coordinates[0];
  }

  // Further reduce data to pure objects
  coordinates =
    coordinates && coordinates.map(coordinate => ({ ...coordinate }));
  center = center && { ...center };

  return {
    ...data,
    coordinates,
    center
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
