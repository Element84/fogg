import { useState, useEffect } from 'react';
import L from 'leaflet';

import {
  isValidLeafletElement,
  clearFeatureGroupLayers,
  currentLeafletRef,
  setMapView,
  centerMapOnGeoJson,
  addGeoJsonLayer
} from '../lib/leaflet';
import { geoJsonFromLatLn, getGeoJsonCenter } from '../lib/map';

// import { formatMapServiceDate } from '../lib/datetime';

/**
 * useMap
 */

const MAP_CONFIG_DEFAULTS = {
  defaultCenter: {
    lat: 0,
    lng: 0
  },
  defaultZoom: 4,
  maxZoom: 18,
  minZoom: 0
};

const MAP_STATE_DEFAULT = {
  initialized: false
};

const AVAILABLE_MAP_CONTROLS = Object.keys(MAP_CONFIG_DEFAULTS);

const mapFeatureGroup = new L.FeatureGroup();

export default function useMap (mapSettings = {}) {
  const { refMap, availableServices = [], projection, draw = {} } = mapSettings;
  const { onCreatedDraw } = draw;

  const defaultMapSettings = buildDefaultMapSettings(mapSettings);

  const [mapState, setMapState] = useState(MAP_STATE_DEFAULT);
  const [mapConfig, setMapConfig] = useState(defaultMapSettings);
  const [mapShape, setMapShape] = useState();
  const [mapServices] = useState(availableServices);

  const { defaultCenter, defaultZoom } = mapConfig;

  // Map build and teardown functions

  useEffect(() => {
    // Set as an initialized state after first render to signal the DOM is ready
    // to be worked with (and refs)

    setMapState({
      initialized: true
    });

    // Teardown

    return () => {
      // Clear any feature group layers to avoid stale layer state

      handleClearLayers();
    };
  }, []);

  // We don't want to update this prop directly on the map component as it will trigger
  // a rerender, instead, we'll use an effect and update the map via it's API

  useEffect(() => {
    setMapConfig({
      ...mapConfig,
      defaultCenter
    });
  }, [defaultCenter]);

  // Using the map instance, create event handlers so we can hook and sync
  // state for other computers to utilize

  useEffect(() => {
    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(map)) return;

    map.on('zoomend', handleOnZoomEnd);

    return () => {
      map.off('zoomend', handleOnZoomEnd);
    };
  }, [refMap]);

  // To make sure we have acccess to the refMap when adding a shape to the map
  // we allow the app to define a mapShape that will subsequently be added to the
  // map. If mapShape isn't available or doesn't change, it won't re-run between
  // renders to avoid incorrect shape layers

  useEffect(() => {
    if (!mapShape) return;

    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(map)) return;

    const {
      geoJson,
      shapeOptions = {},
      centerGeoJson,
      panToShape = true,
      zoom
    } = mapShape;

    const geoJsonLayer = addGeoJsonLayer({
      geoJson,
      map,
      featureGroup: mapFeatureGroup,
      options: shapeOptions
    });

    const layersToExclude = [];

    geoJsonLayer.eachLayer(layer => layersToExclude.push(layer));

    if (panToShape) {
      centerMapOnGeoJson({
        geoJson: centerGeoJson,
        map,
        settings: {
          zoom
        }
      });
    }

    handleClearLayers({
      excludeLayers: layersToExclude
    });
  }, [mapShape]);

  /**
   * handleOnZoomEnd
   */

  function handleOnZoomEnd ({ target } = {}) {
    setMapConfig(state => {
      return {
        ...state,
        zoom: target.getZoom()
      };
    });
  }

  /**
   * handleResetMapView
   */

  function handleResetMapView () {
    setMapViewToCoordinates(defaultCenter, {
      zoom: defaultZoom
    });
  }

  /**
   * setMapViewToCoordinates
   */

  function setMapViewToCoordinates (center, settings = {}) {
    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(map)) return;

    setMapView({
      map,
      settings: {
        ...settings,
        center
      }
    });
  }

  /**
   * handleClearLayers
   */

  async function handleClearLayers ({
    featureGroup = mapFeatureGroup,
    excludeLayers = []
  } = {}) {
    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(featureGroup)) return;

    clearFeatureGroupLayers({
      featureGroup,
      map,
      excludeLayers
    });
  }

  /**
   * handleOnLayerCreate
   */

  function handleOnLayerCreate ({ layer, featureGroup = mapFeatureGroup }) {
    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(map)) return;

    if (typeof onCreatedDraw === 'function') {
      onCreatedDraw({ layer, featureGroup, map });
    }
  }

  /**
   * handleOnLayerCreate
   */

  function handleAddShapeToMap (settings = {}) {
    const errorBase =
      'useMap::handleAddShapeToMap - Failed to add shape to map';
    const { panToShape, center, geoJson, zoom, shapeOptions = {} } = settings;
    let centerGeoJson;

    if (!geoJson) {
      throw new Error(`${errorBase}: Invalid geoJson`);
    }

    if (center) {
      centerGeoJson = geoJsonFromLatLn(center);
    } else {
      centerGeoJson = getGeoJsonCenter(geoJson);
    }

    setMapShape({
      geoJson,
      shapeOptions,
      centerGeoJson,
      panToShape,
      zoom
    });
  }

  function handleCenterMapOnGeoJson (settings = {}) {
    return centerMapOnGeoJson(settings);
  }

  function handleAddGeoJsonLayer (settings = {}) {
    return addGeoJsonLayer(settings);
  }

  // useEffect(() => {
  //   updateTileDate(date);
  // }, [date]);

  // function updateTileDate (date) {
  //   const { date: dateRange = {} } = date || {};
  //   const tileDate =
  //     formatMapServiceDate(dateRange.end) ||
  //     formatMapServiceDate(dateRange.start);
  //   updateMapServices(
  //     availableServices.map(service => {
  //       return {
  //         ...service,
  //         time: service.enableDynamicTime
  //           ? tileDate || service.time
  //           : service.time
  //       };
  //     })
  //   );
  // }

  return {
    refMap,
    mapFeatureGroup,
    mapConfig,
    mapState,
    services: mapServices,
    projection,
    draw,

    clearLayers: handleClearLayers,
    onLayerCreate: handleOnLayerCreate,
    resetMapView: handleResetMapView,
    centerMapOnGeoJson: handleCenterMapOnGeoJson,
    addGeoJsonLayer: handleAddGeoJsonLayer,
    addShapeToMap: handleAddShapeToMap
  };
}

/**
 * buildDefaultMapSettings
 * @description Builds a set of default settings given user overrides
 */

function buildDefaultMapSettings (userSettings) {
  const defaults = {};

  // Loop through the controls we make available as a setting and populate
  // our default settings object with them from the mapSettings argument

  AVAILABLE_MAP_CONTROLS.forEach(control => {
    defaults[control] = userSettings[control] || MAP_CONFIG_DEFAULTS[control];
  });

  // If we don't have a zoom on the default settings, set it to the defaultZoom

  if (typeof defaults.zoom !== 'number') {
    defaults.zoom = defaults.defaultZoom;
  }

  return defaults;
}

// /**
//  * Options to pass to EditControl's draw prop
//  * @see See [react-leaflet-draw](https://github.com/alex3165/react-leaflet-draw) for component
//  * @see See [Leaflet Draw](https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#drawoptions) for draw options
//  */
// drawControlOptions: PropTypes.object,
// /**
//  * Custom onCreated function will override handleOnCreated in useLens that is passed to EditControl
//  * Return true to stop Lens from searching after function execution
//  * @see See [react-leaflet-draw](https://github.com/alex3165/react-leaflet-draw) for component
//  */
// onCreatedDraw: PropTypes.func,
