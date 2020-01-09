import { useState, useEffect } from 'react';
import { castArray, isPlainObject, snakeCase } from 'lodash';

export default function useLayers (availableLayers, fetchLayerData) {
  const defaultLayers = buildDefaultLayers(availableLayers);

  const [layers, updateLayers] = useState(defaultLayers);

  useEffect(() => {
    getDataForLayers(fetchLayerData);
  }, []);

  /**
   * getDataForLayers
   */

  function getDataForLayers (fetchFns) {
    castArray(fetchFns).forEach(fetchFn => {
      getDataForLayer(layers, fetchFn);
    });
  }

  /**
   * getDataForLayer
   */

  function getDataForLayer (layers, fetchFn) {
    if (typeof fetchFn === 'function') {
      const getLayerData = async () => {
        return fetchFn();
      };

      getLayerData().then(response => {
        const newLayer = getLayerById(layers, getLayerIdByName(response.name));
        newLayer.data = response;
        updateLayers(
          replaceInLayersByType(
            layers,
            newLayer,
            getLayerTypeById(layers, newLayer.id)
          )
        );
      });
    }
  }

  /**
   * toggleLayer
   */

  function toggleLayer (id) {
    const layerType = getLayerTypeById(layers, id);
    const newLayers = {
      ...layers
    };

    if (layerType === 'base') {
      newLayers.base = layers.base.map(layer => {
        // If we only have one base layer, dont do anything

        if (layers.base.length === 1) return layer;

        // If we have more than one base layer, set isActive only on that layer

        return {
          ...layer,
          isActive: id === layer.id
        };
      });
    }

    if (layerType === 'overlay') {
      newLayers.overlay = layers.overlay.map(layer => {
        // Overlay layers support more than one active layer, so we only update the layer
        // the user has toggled

        if (id === layer.id) {
          return {
            ...layer,
            isActive: !layer.isActive
          };
        }
        return layer;
      });
    }
    updateLayers(newLayers);
  }

  return {
    layers,
    toggleLayer,
    getDataForLayers
  };
}

/**
 * getLayerTypeById
 */

function getLayerTypeById (layers, id) {
  if (layers.base.find(layer => id === layer.id)) return 'base';
  if (layers.overlay.find(layer => id === layer.id)) return 'overlay';
}

/**
 * getLayerIdByName
 */

function getLayerIdByName (name) {
  return snakeCase(name);
}

/**
 * replaceInLayersByType
 */

function replaceInLayersByType (layers, newLayer, type) {
  return {
    ...layers,
    [type]: [
      ...layers[type].map(layer => {
        if (layer.id === newLayer.id) return newLayer;
        return layer;
      })
    ]
  };
}

/**
 * constructLayer
 */

function constructLayer (layer, visibilityForLayer) {
  const { name, type, serviceName, data, defaultIsActive } = layer;
  return {
    id: snakeCase(name),
    name,
    type,
    serviceName,
    data,
    isActive: defaultIsActive || !!visibilityForLayer
  };
}

/**
 * getLayerById
 */

function getLayerById (layers, id) {
  return [...layers.base, ...layers.overlay].find(layer => id === layer.id);
}

/**
 * buildDefaultLayers
 */

function buildDefaultLayers (availableLayers) {
  const defaultLayers = {
    base: [],
    overlay: []
  };

  if (Array.isArray(availableLayers)) {
    // Available layers can also be an array, which assumes each layer as a base layer

    availableLayers.forEach((layer, i) => {
      defaultLayers.base.push(constructLayer(layer, i === 0));
    });
  } else if (isPlainObject(availableLayers)) {
    // Otherwise assume availableLayers is an object that has the keys 'base' and 'overlay'

    if (Array.isArray(availableLayers.base)) {
      availableLayers.base.forEach((layer, i) => {
        defaultLayers.base.push(constructLayer(layer, i === 0));
      });
    }

    // Set all overlay layers to false, unless defaultIsActive is set to override

    if (Array.isArray(availableLayers.overlay)) {
      availableLayers.overlay.forEach(layer => {
        defaultLayers.overlay.push(constructLayer(layer, false));
      });
    }
  }

  return defaultLayers;
}
