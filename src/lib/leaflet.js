import L from 'leaflet';

import { latLngFromGeoJson } from './map';
import { isDomAvailable } from './device';
import Logger from './logger';

const logger = new Logger('lib/leaflet', {
  isBrowser: true
});

export function leafletIsReady () {
  return (
    isDomAvailable() &&
    typeof L !== 'undefined' &&
    typeof L.version === 'string'
  );
}

/**
 * isValidLeafletElement
 * @description Helper to check if the element is a valid leaflet element
 */

export function isValidLeafletElement (el) {
  return !!(el && el._leaflet_id);
}

/**
 * isLeafletLayerGroup
 * @description Helper to check if the element is a layer group
 */

export function isLeafletLayerGroup (el) {
  return !!(el && typeof el.getLayers === 'function');
}

/**
 * isLeafletLayer
 * @description Helper to check if the element is a layer
 */

export function isLeafletLayer (el) {
  return !!(el && typeof el.getTileUrl === 'function');
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
 * createTileLayer
 */

export function createTileLayer (url, options = {}) {
  const errorBase = 'createTileLayer - Failed to create tile layer';
  if (!leafletIsReady()) return;

  const { attribution } = options;

  if (!attribution) {
    logger.warn(`createTileLayer - Missing attribution for URL ${url}`);
  }

  if (typeof url !== 'string') {
    throw new Error(`${errorBase}: Invalid URL`);
  }

  return L.tileLayer(url, {
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
  const geoJsonLayer = createGeoJsonLayer(geoJson, options);

  if (!isValidLeafletElement(geoJsonLayer)) {
    throw new Error(`${errorBase}: Invalid layer`);
  }

  if (isLeafletLayerGroup(featureGroup)) {
    geoJsonLayer.eachLayer((layer) => featureGroup.addLayer(layer));
    featureGroup.addTo(map);
  } else {
    geoJsonLayer.addTo(map);
  }

  return geoJsonLayer;
}

/**
 * addTileLayer
 */

export function addTileLayer ({ url, map, featureGroup, options = {} } = {}) {
  const errorBase = 'addTileLayer - Failed to add tile layer';
  const layer = createTileLayer(url, {
    ...options
  });

  if (!isLeafletLayer(layer)) {
    throw new Error(`${errorBase}: Invalid layer`);
  }

  if (isLeafletLayerGroup(featureGroup)) {
    featureGroup.addLayer(layer);
    featureGroup.addTo(map);
  } else {
    layer.addTo(map);
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
  const errorBase =
    'clearFeatureGroupLayers - Failed clear feature group layers';
  const isValidMap = isValidLeafletElement(map);

  if (!isValidLeafletElement(featureGroup)) {
    throw new Error(`${errorBase}: Invalid feature group`);
  }

  const excludeIds = excludeLayers.map(({ _leaflet_id: id } = {}) => id);
  let layers = featureGroup.getLayers();

  layers = layers.filter(
    ({ _leaflet_id: id } = {}) => !excludeIds.includes(id)
  );

  layers.forEach((layer) => {
    featureGroup.removeLayer(layer);
    if (isValidMap) map.removeLayer(layer);
  });
}

/**
 * clearFeatureGroupLayer
 */

export function clearFeatureGroupLayer ({ layer, featureGroup, map } = {}) {
  const errorBase =
    'clearFeatureGroupLayer - Failed clear layer from feature group';
  const isValidMap = isValidLeafletElement(map);

  if (!isValidLeafletElement(featureGroup)) {
    throw new Error(`${errorBase}: Invalid feature group`);
  }

  featureGroup.removeLayer(layer);
  if (isValidMap) map.removeLayer(layer);
}

/**
 * findLayerByName
 */

export function findLayerByName ({ name: layerName, featureGroup } = {}) {
  const errorBase = 'findLayerByName - Failed to find layer';

  if (!isLeafletLayerGroup(featureGroup)) {
    throw new Error(`${errorBase}: Invalid feature group`);
  }

  const featureLayers = featureGroup.getLayers();

  return featureLayers.find(({ options = {} } = {}) => {
    const { name } = options;
    return layerName === name;
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

  // Current returns null if unavialable, so we need to additionally
  // add an option for a falsy current value

  const { leafletElement } = current || {};

  return leafletElement;
}

/**
 * toolbarsFromDrawControl
 */

export function toolbarsFromDrawControl ({ drawControl = {} }) {
  return drawControl._toolbars;
}

/**
 * toolbarFromDrawControl
 */

export function toolbarFromDrawControl ({ name, drawControl = {} }) {
  const toolbars = toolbarsFromDrawControl({
    drawControl
  });
  return toolbars && toolbars[name];
}

/**
 * drawModeFromDrawControl
 */

export function drawModeFromDrawControl ({ name, drawControl = {} }) {
  const drawTroolbar = toolbarFromDrawControl({
    name: 'draw',
    drawControl
  });
  const modes = drawTroolbar && drawTroolbar._modes;
  return modes && modes[name];
}
