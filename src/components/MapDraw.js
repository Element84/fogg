import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import 'leaflet-draw/dist/leaflet.draw.css';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { useMapMarkerIcon } from '../hooks';
import {
  clearLeafletElementLayers,
  reduceDrawEventToLayer
} from '../lib/leaflet';

const MapDraw = React.forwardRef(
  ({ children, onCreated, disableEditControls = false }, ref) => {
    const refFeatureGroup = ref || createRef();
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

    return (
      <FeatureGroup ref={refFeatureGroup}>
        {children}
        {!disableEditControls && (
          <EditControl
            position="bottomright"
            onCreated={handleOnCreated}
            draw={{
              circle: false,
              circlemarker: false,
              polyline: false,
              marker: {
                icon
              }
            }}
            edit={{
              edit: false,
              remove: false
            }}
          />
        )}
      </FeatureGroup>
    );
  }
);

MapDraw.propTypes = {
  children: PropTypes.node,
  onCreated: PropTypes.func,
  disableEditControls: PropTypes.bool
};

export default MapDraw;
