import L from 'leaflet';
import { geocode } from 'esri-leaflet-geocoder';
import GeoJSON from 'geojson';
import PromiseCancelable from 'p-cancelable';

const DRAW_SHAPES = ['polygon', 'rectangle'];

const SHAPE_TO_GEOTYPE_MAP = {
  marker: 'Point',
  polygon: 'Polygon',
  rectangle: 'Polygon'
};

const GEOJSON_PARSE_SETTINGS = {
  Point: [
    // Logically you would think this should be lng,lat, but
    // apparently geojson wants it this way in order to
    // properly arrange the coordinates
    'lat',
    'lng'
  ],
  LineString: 'line',
  Polygon: 'polygon'
};

/**
 * clearLeafletElementLayers
 * @description Given a LeafletElement, clear all layers
 */

export function clearLeafletElementLayers (leafletElement, excludeIds = []) {
  const layers = leafletElement.getLayers();
  const layersToRemove = layers.filter(
    layer => !excludeIds.includes(layer._leaflet_id)
  );

  layersToRemove.forEach(layer => leafletElement.removeLayer(layer));
}

/**
 * addLeafletMarker
 * @description Given a LeafletElement, clear all layers
 */

export function addLeafletMarkerLayer ({ lat, lng }, map) {
  return L.marker([lat, lng], {
    icon: buildMapMarkerIcon()
  }).addTo(map);
}

/**
 * getShapeType
 * @description Given a Leaflet Layer, produce the shape type
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
 * @description Given a Leaflet Layer, produce a set of coordinates
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
 * @description Given a Leaflet layer, produce a GeoJSON doc
 */

export function geoJsonFromLayer (layer) {
  const shape = getShapeType(layer);
  const type = SHAPE_TO_GEOTYPE_MAP[shape];
  const coordinates = coordinatesFromLayer(layer);

  let data = [];

  if (type === 'Point') {
    data.push({
      lng: coordinates[0].lng,
      lat: coordinates[0].lat
    });
  } else if (type === 'Polygon') {
    const polygon = coordinates.map(({ lat, lng }) => {
      return [lng, lat];
    });

    const lastPolygon = polygon[polygon.length - 1];

    // If the first set of coordinates do not match the last set, we need to
    // push the first set on to the end of the coordinates array so that we can
    // "close" the shape
    if (polygon[0][0] !== lastPolygon[0] || polygon[0][1] !== lastPolygon[1]) {
      polygon.push(polygon[0]);
    }

    data.push({
      polygon: [polygon]
    });
  }

  return GeoJSON.parse(data, { ...GEOJSON_PARSE_SETTINGS });
}

/**
 * geoJsonFromLatLn
 * @description Given a lat and long, produce a GeoJSON doc
 */

export function geoJsonFromLatLn ({ lat = 0, lng = 0 }) {
  return GeoJSON.parse(
    [
      {
        lng,
        lat
      }
    ],
    { ...GEOJSON_PARSE_SETTINGS }
  );
}

/**
 * geoJsonLayerFromLatLn
 * @description Given a lat and long, produce a GeoJSON Leaflet Layer
 */

export function geoJsonLayerFromLatLn (position) {
  const geoJson = geoJsonFromLatLn(position);
  return L.geoJSON(geoJson);
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

/**
 * buildMapMarkerIcon
 * @description Creates a new custom Leaflet map marker icoon
 */

export function buildMapMarkerIcon () {
  let icon;
  // Leaflet uses window to bea ble to set up an icon, so we need to
  // make sure it's available otherwise don't return anything of value
  if (!icon && typeof window !== 'undefined') {
    icon = new L.Icon({
      iconUrl: require('../assets/images/map-marker.svg'),
      iconAnchor: [5, 55],
      popupAnchor: [10, -44],
      iconSize: [32], // SVG auto scales, ignore 2nd height value
      shadowUrl: require('../assets/images/map-marker-shadow.svg'),
      shadowSize: [20], // SVG auto scales, ignore 2nd height value
      shadowAnchor: [0, 18],
      className: 'map-marker'
    });
  }
  return icon;
}
