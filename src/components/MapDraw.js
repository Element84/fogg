import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import 'leaflet-draw/dist/leaflet.draw.css';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { useMapMarkerIcon } from '../hooks';
import {
  clearLeafletElementLayers,
  getShapeType,
  reduceDrawEventToLayer
} from '../lib/leaflet';

const MapDraw = ({ children, onCreated, onEdited }) => {
  const refFeatureGroup = createRef();
  const { icon } = useMapMarkerIcon();

  /**
   * handleOnCreated
   * @description Fires when a layer is created. Triggers callback if available.
   *     Clears all other layers except the newly created one.
   */

  function handleOnCreated (event = {}) {
    const layer = reduceDrawEventToLayer(event);
    const { current } = refFeatureGroup;
    const { leafletElement } = current || {};

    if (leafletElement) {
      clearLeafletElementLayers(leafletElement, [layer.id]);
    }

    if (typeof onCreated === 'function') {
      onCreated(layer);
    }
  }

  /**
   * handleOnEdited
   * @description Fires when a layer is edited. Triggers a callback of available
   */

  function handleOnEdited (event = {}) {
    const { layers } = event;
    const eventLayers = layers && layers.getLayers();
    let currentLayer;
    let layer;

    if (Array.isArray(eventLayers) && eventLayers.length > 0) {
      currentLayer = eventLayers[0];
      layer = reduceDrawEventToLayer({
        layer: currentLayer,
        layerType: getShapeType(currentLayer)
      });
    }

    if (typeof onEdited === 'function') {
      onEdited(layer);
    }
  }

  return (
    <FeatureGroup ref={refFeatureGroup}>
      {children}
      <EditControl
        position="bottomright"
        onCreated={handleOnCreated}
        onEdited={handleOnEdited}
        draw={{
          circle: false,
          circlemarker: false,
          polyline: false,
          marker: {
            icon
          }
        }}
      />
    </FeatureGroup>
  );
};

MapDraw.propTypes = {
  children: PropTypes.node,
  onCreated: PropTypes.func,
  onEdited: PropTypes.func
};

export default MapDraw;
