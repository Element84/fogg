import L from 'leaflet';
import { useState } from 'react';

import {
  isValidLeafletElement,
  clearFeatureGroupLayers,
  currentLeafletRef
} from '../lib/leaflet';

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
  minZoom: 0,
};

const AVAILABLE_MAP_CONTROLS = Object.keys(MAP_CONFIG_DEFAULTS);

export default function useMap(mapSettings = {}) {
  const { refMap, onCreatedDraw } = mapSettings;

  const defaultMapSettings = {};

  AVAILABLE_MAP_CONTROLS.forEach(control => {
    defaultMapSettings[control] = mapSettings[control] || MAP_CONFIG_DEFAULTS[control];
  });

  const [mapConfig, setMapConfig] = useState(defaultMapSettings)

  /**
   * handleClearLayers
   */

  async function handleClearLayers({ featureGroup, excludeLayers = []}) {
    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(map)) return;

    clearFeatureGroupLayers(featureGroup, map, excludeLayers);
  }

  /**
   * handleOnLayerCreate
   */

  function handleOnLayerCreate({ layer, featureGroup}) {
    const map = currentLeafletRef(refMap);

    if (!isValidLeafletElement(map)) return;

    if (typeof onCreatedDraw === 'function') {
      onCreatedDraw({ layer, featureGroup, map });
    }
  }

  return {
    refMap,
    mapConfig,
    clearLayers: handleClearLayers,
    onLayerCreate: handleOnLayerCreate
  }

}