import { useState, useEffect } from 'react';

import {
  isValidLeafletElement,
  clearFeatureGroupLayers,
  currentLeafletRef,
  setMapView
} from '../lib/leaflet';

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

const AVAILABLE_MAP_CONTROLS = Object.keys(MAP_CONFIG_DEFAULTS);

export default function useMap (mapSettings = {}) {
  const {
    refMap,
    refFeatureGroup,
    availableServices = [],
    projection,
    draw = {}
  } = mapSettings;
  const { onCreatedDraw } = draw;

  const defaultMapSettings = {};

  // Loop through the controls we make available as a setting and populate
  // our default settings object with them from the mapSettings argument

  AVAILABLE_MAP_CONTROLS.forEach(control => {
    defaultMapSettings[control] =
      mapSettings[control] || MAP_CONFIG_DEFAULTS[control];
  });

  const [mapConfig, setMapConfig] = useState(defaultMapSettings);
  const [mapServices] = useState(availableServices);

  const { defaultCenter } = mapConfig;

  // We don't want to update this prop directly on the map component as it will trigger
  // a rerender, instead, we'll use an effect and update the map via it's API

  useEffect(() => {
    setMapViewToCoordinates(defaultCenter);
    setMapConfig({
      ...mapConfig,
      defaultCenter
    });
  }, [defaultCenter]);

  /**
   * setMapViewToCoordinates
   */

  function setMapViewToCoordinates (center) {
    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(map)) return;

    setMapView({
      map,
      settings: {
        center
      }
    });
  }

  /**
   * handleClearLayers
   */

  async function handleClearLayers ({ featureGroup, excludeLayers = [] } = {}) {
    const map = currentLeafletRef(refMap);

    if (!featureGroup) {
      featureGroup = currentLeafletRef(refFeatureGroup);
    }

    if (!isValidLeafletElement(map)) return;

    clearFeatureGroupLayers({
      featureGroup,
      map,
      excludeLayers
    });
  }

  /**
   * handleOnLayerCreate
   */

  function handleOnLayerCreate ({ layer, featureGroup }) {
    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(map)) return;

    if (!featureGroup) {
      featureGroup = currentLeafletRef(refFeatureGroup);
    }

    if (typeof onCreatedDraw === 'function') {
      onCreatedDraw({ layer, featureGroup, map });
    }
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
    refFeatureGroup,
    mapConfig,
    clearLayers: handleClearLayers,
    onLayerCreate: handleOnLayerCreate,
    services: mapServices,
    projection,
    draw
  };
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
