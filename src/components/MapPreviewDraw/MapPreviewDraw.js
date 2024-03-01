import React from 'react';
import PropTypes from 'prop-types';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { useMapMarkerIcon } from '../../hooks';

import FeatureGroup from '../FeatureGroup';

const DEFAULT_CONTROL_OPTIONS = {
  circle: false,
  circlemarker: false,
  marker: true,
  polygon: true,
  polyline: false,
  rectangle: true
};

const SHAPE_CONTROLS = ['circle', 'polygon', 'polyline', 'rectangle'];

const DEFAULT_SHAPE_OPTIONS = {
  opacity: 1,
  weight: 3
};

const MapPreviewDraw = ({
  children,
  forwardedRef,
  onCreated,
  onEdited,
  disableDrawControls = false,
  disableEditControls = false,
  controlOptions,
  shapeOptions,
  PopupContent,
  featureGroup,
  featureRef,
  ...rest
}) => {
  const { icon } = useMapMarkerIcon();

  const markerOptions = {
    marker: {
      icon
    }
  };

  const drawOptions = {
    ...DEFAULT_CONTROL_OPTIONS,
    ...markerOptions,
    ...controlOptions
  };

  // Loop through all of our configured options and determine the
  // shape configuration for each if a valid shape

  Object.keys(drawOptions).forEach((key) => {
    // Check if the option is turned off or if it's a valid shape

    if (!drawOptions[key] || !SHAPE_CONTROLS.includes(key)) return;

    // If it's set to true, we want to initialize the object for the shape
    // to set our options on

    if (drawOptions[key] === true) {
      drawOptions[key] = {};
    }

    drawOptions[key].shapeOptions = {
      ...DEFAULT_SHAPE_OPTIONS,
      ...drawOptions[key].shapeOptions,
      ...(shapeOptions && shapeOptions.style)
    };
  });

  /**
   * handleOnCreated
   * @description Fires when a layer is created. Triggers callback if available.
   *     Clears all other layers except the newly created one.
   */

  function handleOnCreated ({ layer } = {}) {
    if (typeof onCreated === 'function') {
      onCreated(layer, forwardedRef);
    }
  }

  /**
   * handleOnEdited
   * @description Fires when a layer is edited. Triggers callback if available.
   */

  function handleOnEdited ({ target } = {}) {
    if (typeof onEdited === 'function') {
      onEdited(target, forwardedRef);
    }
  }

  return (
    <FeatureGroup featureGroup={featureGroup} ref={featureRef}>
      {children}
      {!disableDrawControls && (
        <>
          <EditControl
            key={disableEditControls}
            position="bottomright"
            onCreated={handleOnCreated}
            onEdited={handleOnEdited}
            draw={drawOptions}
            edit={{
              featureGroup: featureRef,
              edit: !disableEditControls,
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

MapPreviewDraw.propTypes = {
  children: PropTypes.node,
  forwardedRef: PropTypes.object,
  onCreated: PropTypes.func,
  onEdited: PropTypes.func,
  disableDrawControls: PropTypes.bool,
  disableEditControls: PropTypes.bool,
  controlOptions: PropTypes.object,
  shapeOptions: PropTypes.object,
  featureGroup: PropTypes.object,
  PopupContent: PropTypes.any,
  featureRef: PropTypes.object
};

const MapPreviewDrawWithRefs = React.forwardRef(function mapDraw (props, ref) {
  return <MapPreviewDraw {...props} forwardedRef={ref} />;
});

MapPreviewDrawWithRefs.displayName = 'MapDrawWithRefs';

export default MapPreviewDrawWithRefs;
