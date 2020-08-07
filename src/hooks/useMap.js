import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';

import {
  isValidLeafletElement,
  clearFeatureGroupLayers,
  clearFeatureGroupLayer,
  currentLeafletRef,
  setMapView,
  centerMapOnGeoJson,
  addGeoJsonLayer,
  addTileLayer,
  findLayerByName,
  drawModeFromDrawControl
} from '../lib/leaflet';
import { geoJsonFromLatLn, getGeoJsonCenter } from '../lib/map';
import { isDomAvailable } from '../lib/device';

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

const DRAW_STATE_DEFAULT = {
  active: false
};

const AVAILABLE_MAP_CONTROLS = Object.keys(MAP_CONFIG_DEFAULTS);

let defaultMapFeaturesGroup;
let defaultMapOverlaysGroup;

const mapFeatureGroups = [];

if (isDomAvailable()) {
  defaultMapFeaturesGroup = new L.FeatureGroup();
  defaultMapOverlaysGroup = new L.FeatureGroup();

  mapFeatureGroups.push({
    id: 'default-features',
    featureGroup: defaultMapFeaturesGroup
  });

  mapFeatureGroups.push({
    id: 'default-overlays',
    featureGroup: defaultMapOverlaysGroup
  });
}

export default function useMap (mapSettings = {}) {
  const refMap = useRef();
  const refDrawControl = useRef();

  const { availableServices = [], projection, draw = {} } = mapSettings;
  const { onCreatedDraw, shapeOptions } = draw;

  const defaultMapSettings = buildDefaultMapSettings(mapSettings);

  const [mapState, setMapState] = useState(MAP_STATE_DEFAULT);
  const [mapConfig, setMapConfig] = useState(defaultMapSettings);
  const [mapServices] = useState(availableServices);

  const [drawState, setDrawState] = useState(DRAW_STATE_DEFAULT);

  const { defaultCenter, defaultZoom } = mapConfig;

  /**************
   * DRAW STATE *
   **************/

  function handleOnDrawStart () {
    setDrawState((prev) => {
      return {
        ...prev,
        active: true
      };
    });
  }
  function handleOnDrawStop () {
    setDrawState((prev) => {
      return {
        ...prev,
        active: false
      };
    });
  }

  useEffect(() => {
    const map = currentLeafletRef(refMap);

    map.on(L.Draw.Event.DRAWSTART, handleOnDrawStart);
    map.on(L.Draw.Event.DRAWSTOP, handleOnDrawStop);

    return () => {
      map.off(L.Draw.Event.DRAWSTART, handleOnDrawStart);
      map.off(L.Draw.Event.DRAWSTOP, handleOnDrawStop);
    };
  }, []);

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

      if (!Array.isArray(mapFeatureGroups) || mapFeatureGroups.length === 0) {
        handleClearLayers();
        return;
      }

      mapFeatureGroups.forEach(({ featureGroup } = {}) => {
        handleClearLayers({
          featureGroup
        });
      });
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

  /**
   * handleOnZoomEnd
   */

  function handleOnZoomEnd ({ target } = {}) {
    setMapConfig((state) => {
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
    featureGroup = defaultMapFeaturesGroup,
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
   * handleClearLayer
   */

  function handleClearLayer (settings) {
    const map = currentLeafletRef(refMap);
    clearFeatureGroupLayer({
      map,
      featureGroup: defaultMapFeaturesGroup,
      ...settings
    });
  }

  /**
   * handleOnLayerCreate
   */

  function handleOnLayerCreate ({
    layer,
    featureGroup = defaultMapFeaturesGroup
  }) {
    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(map)) return;

    if (typeof onCreatedDraw === 'function') {
      onCreatedDraw({ layer, featureGroup, map });
    }
  }

  /**
   * handleAddShapeToMap
   */

  function handleAddShapeToMap (settings = {}) {
    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(map)) return;

    const errorBase =
      'useMap::handleAddShapeToMap - Failed to add shape to map';
    const {
      panToShape,
      center,
      zoom,
      shapeOptions: mapShapeOptions = shapeOptions,
      clearOtherLayers = true,
      featureGroup = defaultMapFeaturesGroup
    } = settings;

    let { geoJson } = settings;

    let centerGeoJson;

    if (!center && !geoJson) {
      throw new Error(`${errorBase}: Can't find center or geoJson`);
    }

    if (center) {
      centerGeoJson = geoJsonFromLatLn(center);
    } else {
      centerGeoJson = getGeoJsonCenter(geoJson);
    }

    // If we don't have a geoJson object, let's use our center that
    // we just created

    if (centerGeoJson && !geoJson) {
      geoJson = centerGeoJson;
    }

    const geoJsonLayer = addGeoJsonLayer({
      geoJson,
      map,
      featureGroup,
      options: mapShapeOptions
    });

    const layersToExclude = [];

    geoJsonLayer.eachLayer((layer) => layersToExclude.push(layer));

    if (panToShape) {
      centerMapOnGeoJson({
        geoJson: centerGeoJson,
        map,
        settings: {
          zoom
        }
      });
    }

    if (clearOtherLayers) {
      handleClearLayers({
        featureGroup,
        excludeLayers: layersToExclude
      });
    }
  }

  /**
   * handleClearShapeLayers
   */

  function handleClearShapeLayers (settings) {
    handleClearLayers({
      featureGroup: defaultMapFeaturesGroup,
      ...settings
    });
  }

  /**
   * handleAddTileLayer
   */

  function handleAddTileLayerToMap (settings = {}) {
    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(map)) return;

    const {
      url,
      options,
      featureGroup = defaultMapOverlaysGroup,
      clearOtherLayers
    } = settings;

    const layer = addTileLayer({
      url,
      map,
      featureGroup,
      options
    });

    const layersToExclude = [layer];

    if (clearOtherLayers) {
      handleClearLayers({
        featureGroup,
        excludeLayers: layersToExclude
      });
    }
  }

  /**
   * handleClearTileLayers
   */

  function handleClearTileLayers (settings) {
    handleClearLayers({
      featureGroup: defaultMapOverlaysGroup,
      ...settings
    });
  }

  /**
   * handleClearTileLayer
   */

  function handleClearTileLayer ({
    featureGroup = defaultMapOverlaysGroup,
    name
  } = {}) {
    const layer = findLayerByName({
      name,
      featureGroup
    });

    handleClearLayer({
      featureGroup,
      layer: layer
    });
  }

  /**
   * handleOnLayerCreate
   */

  function handleCenterMapOnGeoJson (settings = {}) {
    return centerMapOnGeoJson(settings);
  }

  /**
   * handleOnLayerCreate
   */

  function handleAddGeoJsonLayer (settings = {}) {
    return addGeoJsonLayer(settings);
  }

  /**
   * handleCreateFeatureGroup
   */

  function handleCreateFeatureGroup (id) {
    const errorBase = 'Failed to create new feature group';

    if (typeof id !== 'string') {
      throw new Error(`${errorBase}: Invalid ID ${id}`);
    }
    const featureGroup = new L.FeatureGroup();

    mapFeatureGroups.push({
      id,
      featureGroup
    });

    return featureGroup;
  }

  /**
   * handleFeatureGroupById
   */

  function handleFeatureGroupById (id) {
    const errorBase = 'Failed to find feature group';

    if (typeof id !== 'string') {
      throw new Error(`${errorBase}: Invalid ID ${id}`);
    }

    return mapFeatureGroups.find((fg) => fg.id === id);
  }

  /**
   * handleEnableDrawTool
   */

  function handleEnableDrawTool ({ name }) {
    const drawControl = currentLeafletRef(refDrawControl);
    const drawMode = drawModeFromDrawControl({
      drawControl,
      name
    });
    const { handler } = drawMode;
    handler.enable();
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
    refDrawControl,
    mapFeatureGroup: defaultMapFeaturesGroup,
    mapOverlaysGroup: defaultMapOverlaysGroup,
    mapConfig,
    mapState,
    services: mapServices,
    projection,
    draw,
    drawState,

    clearLayers: handleClearLayers,
    onLayerCreate: handleOnLayerCreate,
    resetMapView: handleResetMapView,
    centerMapOnGeoJson: handleCenterMapOnGeoJson,
    addGeoJsonLayer: handleAddGeoJsonLayer,
    addShapeToMap: handleAddShapeToMap,
    clearShapeLayers: handleClearShapeLayers,
    addTileLayerToMap: handleAddTileLayerToMap,
    clearTileLayers: handleClearTileLayers,
    clearTileLayer: handleClearTileLayer,
    createFeatureGroup: handleCreateFeatureGroup,
    featureGroupById: handleFeatureGroupById,
    enableDrawTool: handleEnableDrawTool
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

  AVAILABLE_MAP_CONTROLS.forEach((control) => {
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
