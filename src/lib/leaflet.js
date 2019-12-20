import L from 'leaflet';
import { latLngFromGeoJson } from './map';

export function leafletIsReady () {
  return typeof L !== 'undefined' && typeof L.version === 'string';
}

/**
 * isValidLeafletElement
 * @description Helper to check if the element is a valid leaflet element
 */

export function isValidLeafletElement (el) {
  return !!el._leaflet_id;
}

/**
 * createMarkerIcon
 * @description Creates a new custom Leaflet map marker icoon
 */

export function createMarkerIcon () {
  if (!leafletIsReady()) return;

  let icon;
  // Leaflet uses window to be able to set up an icon, so we need to
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
 * createMapMarker
 */

export function createMapMarker (latlng) {
  if (!leafletIsReady()) return;
  return L.marker(latlng, {
    icon: createMarkerIcon()
  });
}

/**
 * createGeoJsonLayer
 */

export function createGeoJsonLayer (geoJson, options = {}) {
  if (!leafletIsReady()) return;
  return L.geoJson(geoJson, {
    pointToLayer: (geoJsonPoint, latlng) => {
      return createMapMarker(latlng);
    },
    ...options
  });
}

/**
 * addGeoJsonLayer
 */

export function addGeoJsonLayer ({
  geoJson,
  map,
  featureGroup,
  options = {}
} = {}) {
  const errorBase = 'addGeoJsonLayer - Failed to add geoJson layer';
  const layer = createGeoJsonLayer(geoJson, options);

  if (!isValidLeafletElement(layer)) {
    throw new Error(`${errorBase}: Invalid layer`);
  }

  if (isValidLeafletElement(featureGroup)) {
    featureGroup.addLayer(layer);
    featureGroup.addTo(map);
  } else {
    layer.addto(map);
  }
  return layer;
}

/**
 * clearFeatureGroupLayers
 */

export function clearFeatureGroupLayers ({
  featureGroup,
  map,
  excludeLayers = []
} = {}) {
  const excludeIds = excludeLayers.map(({ _leaflet_id: id } = {}) => id);
  let layers = featureGroup.getLayers();

  layers = layers.filter(
    ({ _leaflet_id: id } = {}) => !excludeIds.includes(id)
  );

  layers.forEach(layer => {
    featureGroup.removeLayer(layer);
    map.removeLayer(layer);
  });
}

/**
 * centerMapOnGeoJson
 * @description
 */

export function centerMapOnGeoJson ({ geoJson, map = {}, settings = {} } = {}) {
  const latLngs = latLngFromGeoJson(geoJson);
  const center = latLngs[0];

  setMapView({
    map,
    settings: {
      center,
      ...settings
    }
  });

  return center;
}

/**
 * setMapView
 * @description Wraps the leaflet setView method and triggers on our map ref
 */

export function setMapView ({ map, settings = {} }) {
  const { center } = settings;
  let { zoom } = settings;

  // If we can find the existing zoom, use that to prevent changing the zoom
  // level on someone interacting with the map

  if (!zoom && typeof map.getZoom === 'function') {
    zoom = map.getZoom();
  }

  if (typeof map.setView === 'function') {
    map.setView(center, zoom);
  }
}

/**
 * getShapeType
 * @description Given a Leaflet Layer, produce the shape type
 * @see https://stackoverflow.com/a/25082568/844780
 */

export function getShapeType (layer) {
  if (!leafletIsReady()) return;

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
 * currentLeafletRef
 * @description Helper to grab the current leaflet element available
 */

export function currentLeafletRef (ref = {}) {
  const { current = {} } = ref;
  const { leafletElement } = current;
  return leafletElement;
}
