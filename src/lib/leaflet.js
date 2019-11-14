import L from 'leaflet';
import { geocode } from 'esri-leaflet-geocoder';
import GeoJSON from 'geojson';
import PromiseCancelable from 'p-cancelable';
import { getGeom, center } from '@turf/turf';

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
 * addLeafletShapeLayer
 * @description Given a LeafletElement, clear all layers
 */

export function addLeafletShapeLayer (geoJson = {}, map) {
  const baseError = 'Failed to add shape to map';
  const { type, features } = geoJson;

  if (!type || !Array.isArray(features)) {
    throw new Error(`${baseError}: Invalid geoJson; ${geoJson}`);
  }

  const shapes = features.map((feature = {}) => {
    const { geometry = {} } = feature;
    const latLngs = latLngsFromFeatures([feature])[0];
    const { type } = geometry;
    const typeLower = typeof type === 'string' && type.toLowerCase();
    const leafletCreator = L[typeLower];
    if (!typeLower || !leafletCreator) {
      throw new Error(`${baseError}: Invalid shape type; ${typeLower}`);
    }
    return latLngs.map(latLng => {
      leafletCreator(latLng).addTo(map);
    });
  });
  return shapes;
}

/**
 * getShapeType
 * @description Given a Leaflet Layer, produce the shape type
 * @see https://stackoverflow.com/a/25082568/844780
 */

export function getShapeType (layer) {
  if (!L) return;

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
    center = layer.getCenter();
  } else if (layerType === 'marker') {
    coordinates = [{ ...layer.getLatLng() }];
    center = coordinates[0];
  }

  // Further reduce data to pure objects
  coordinates = coordinatesFromLayer(layer);
  center = center && { ...center };

  const geoJson = geoJsonFromLayer(layer);

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

  const data = [];

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
  if (!GeoJSON) return;
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
  if (!L) return;
  const geoJson = geoJsonFromLatLn(position);
  return L.geoJSON(geoJson);
}

/**
 * geocodePlacename
 * @description Promise that performs a geocode request on the given placename
 */

export function geocodePlacename (placename) {
  return new PromiseCancelable((resolve, reject, onCancel) => {
    if (!geocode) {
      reject('geocodePlacename Error: Geocode not available.');
    }
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
  if (!L) return;

  let icon;
  // Leaflet uses window to bea ble to set up an icon, so we need to
  // make sure it's available otherwise don't return anything of value
  if (!icon && typeof window !== 'undefined') {
    icon = new L.Icon({
      iconUrl: require('../assets/images/map-marker.svg'),
      iconAnchor: [16, 39],
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

/**
 * latLngFromGeoJson
 * @description Grabs Lat and Lng sets from GeoJSON
 */

export function latLngFromGeoJson (geoJson, type = 'object') {
  const coordinates = coordinatesFromGeoJson(geoJson);
  return coordinates.map(set => {
    if (type === 'array') {
      return [set[1], set[0]];
    }
    return {
      lng: set[0],
      lat: set[1]
    };
  });
}

export function latLngsFromFeatures (features) {
  if (!Array.isArray(features)) {
    features = [features];
  }
  return features.map(({ geometry = {} } = {}) => {
    const { coordinates = [] } = geometry;
    if (!coordinates || coordinates.length === 0) {
      return [];
    }
    return coordinates.map(set => {
      return set.map(([lng, lat]) => {
        return [lat, lng];
      });
    });
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
  let { features } = geoJson;

  // If we don't have any top level features but has a geometry,
  // grab that instead and wrap it in an array for normalization

  if (!features && geoJson.geometry) {
    features = [geoJson.geometry];
  }

  return features.map((feature = {}) => {
    const { coordinates = [] } = getGeom(feature);
    return coordinates;
  });
}

/**
 * latLngPositionFromCenter
 * @description Given the center, returns the position [lat, lng]
 */

export function latLngPositionFromCenter ({ lat = 0, lng = 0 } = {}) {
  return [lat, lng];
}

/**
 * buildLayerSet
 * @description Given the available layers and services, build the Map layers
 */

export function buildLayerSet (availableLayers, availableServices = []) {
  // If no layers are provided, use blue marble

  availableLayers = {
    base: [],
    overlay: [],
    ...availableLayers
  };

  if (!availableLayers.base.length) {
    availableLayers.base.push({
      id: 'blue_marble',
      name: 'Blue Marble',
      serviceName: 'blue_marble',
      isActive: true,
      type: 'service'
    });
  }

  return {
    base: availableLayers.base.map(layer => {
      const service = availableServices.find(
        service => service.name === layer.serviceName
      );
      return {
        ...layer,
        service
      };
    }),
    overlay: availableLayers.overlay.map(layer => {
      const service = availableServices.find(
        service => service.name === layer.serviceName
      );
      return {
        ...layer,
        service
      };
    })
  };
}

/**
 * hasSingleLayer
 * @description Given the layers group, determines if only 1 exists
 */

export function layerSetHasSingleLayer ({ base, overlay } = {}) {
  return base && base.length === 1 && overlay && !overlay.length;
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
