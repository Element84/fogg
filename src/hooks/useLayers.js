import { useState, useEffect } from 'react';
import { castArray, isPlainObject, snakeCase } from 'lodash';

export default function useLayers (availableLayers, fetchLayerData) {
  function constructLayer (layer, visibilityForLayer) {
    return {
      id: snakeCase(layer.name),
      name: layer.name,
      type: layer.type,
      serviceName: layer.serviceName,
      data: layer.data,
      isActive: layer.defaultIsActive || !!visibilityForLayer
    };
  }

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

      castArray(availableLayers.base).forEach((layer, i) => {
        defaultLayers.base.push(constructLayer(layer, i === 0));
      });
      // Set all overlay layers to false, unless defaultIsActive is set to override

      castArray(availableLayers.overlay).forEach(layer => {
        defaultLayers.overlay.push(constructLayer(layer, false));
      });
    }

    return defaultLayers;
  }

  const defaultLayers = buildDefaultLayers(availableLayers);

  const [layers, updateLayers] = useState(defaultLayers);

  useEffect(() => {
    getDataForLayers(fetchLayerData);
  }, []);

  function getDataForLayer (fetchFn) {
    if (typeof fetchFn === 'function') {
      const getLayerData = async () => {
        return fetchFn();
      };

      getLayerData().then(response => {
        const newLayer = getLayerById(getLayerIdByName(response.name));
        newLayer.data = response;
        updateLayers(
          replaceInLayersByType(newLayer, getLayerTypeById(newLayer.id))
        );
      });
    }
  }

  function getDataForLayers (fetchFns) {
    castArray(fetchFns).forEach(fetchFn => {
      getDataForLayer(fetchFn);
    });
  }

  function replaceInLayersByType (newLayer, type) {
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

  function getLayerById (id) {
    return [...layers.base, ...layers.overlay].find(layer => id === layer.id);
  }

  function getLayerIdByName (name) {
    return snakeCase(name);
  }

  function getLayerTypeById (id) {
    if (layers.base.find(layer => id === layer.id)) return 'base';
    if (layers.overlay.find(layer => id === layer.id)) return 'overlay';
  }

  function toggleLayer (id) {
    const layerType = getLayerTypeById(id);
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
