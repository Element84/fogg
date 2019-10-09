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

const DEFAULT_CONTROL_OPTIONS = {
  circle: false,
  circlemarker: false,
  polyline: false
};

const MapDraw = ({
  children,
  forwardedRef,
  onCreated,
  disableEditControls = false,
  controlOptions = DEFAULT_CONTROL_OPTIONS
}) => {
  const refFeatureGroup = forwardedRef || createRef();
  const { icon } = useMapMarkerIcon();

  const markerOptions = {
    marker: {
      icon
    }
  };

  const drawOptions = {
    ...markerOptions,
    ...controlOptions
  };

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
          draw={drawOptions}
          edit={{
            edit: false,
            remove: false
          }}
        />
      )}
    </FeatureGroup>
  );
};

MapDraw.propTypes = {
  children: PropTypes.node,
  forwardedRef: PropTypes.object,
  onCreated: PropTypes.func,
  disableEditControls: PropTypes.bool,
  controlOptions: PropTypes.object
};

const MapDrawWithRefs = React.forwardRef(function mapDraw (props, ref) {
  return <MapDraw {...props} forwardedRef={ref} />;
});

MapDrawWithRefs.displayName = 'MapDrawWithRefs';

export default MapDrawWithRefs;
