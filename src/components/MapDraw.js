import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import 'leaflet-draw/dist/leaflet.draw.css';
import { FeatureGroup, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { useMapMarkerIcon } from '../hooks';
import { currentLeafletRef } from '../lib/leaflet';

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
  controlOptions = DEFAULT_CONTROL_OPTIONS,
  PopupContent,
  ...rest
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

  function handleOnCreated ({ layer } = {}) {
    const featureGroup = currentLeafletRef(refFeatureGroup);
    if (typeof onCreated === 'function') {
      onCreated(layer, featureGroup);
    }
  }

  return (
    <FeatureGroup ref={refFeatureGroup}>
      {children}
      {!disableEditControls && (
        <>
          <EditControl
            position="bottomright"
            onCreated={handleOnCreated}
            draw={drawOptions}
            edit={{
              edit: false,
              remove: false
            }}
          />
          {PopupContent && (
            <Popup>
              <PopupContent {...rest} />
            </Popup>
          )}
        </>
      )}
    </FeatureGroup>
  );
};

MapDraw.propTypes = {
  children: PropTypes.node,
  forwardedRef: PropTypes.object,
  onCreated: PropTypes.func,
  disableEditControls: PropTypes.bool,
  controlOptions: PropTypes.object,
  PopupContent: PropTypes.any
};

const MapDrawWithRefs = React.forwardRef(function mapDraw (props, ref) {
  return <MapDraw {...props} forwardedRef={ref} />;
});

MapDrawWithRefs.displayName = 'MapDrawWithRefs';

export default MapDrawWithRefs;
