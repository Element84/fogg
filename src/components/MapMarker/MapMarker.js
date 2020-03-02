import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-leaflet';

import { useMapMarkerIcon } from '../../hooks';

const MapMarker = props => {
  const { icon } = useMapMarkerIcon();

  const refMarker = createRef();
  const { onDragEnd } = props;

  /**
   * handleDragEnd
   * @description Handler that updates map position upon marker drag
   */

  function handleDragEnd (event) {
    if (typeof onDragEnd === 'function') {
      onDragEnd(event, refMarker);
    }
  }

  // Order here matters, we want our ref and drag handler to always prevail
  const markerProps = {
    ...props,
    ref: refMarker,
    onDragEnd: handleDragEnd
  };

  if (icon) {
    markerProps.icon = icon;
  }

  return <Marker {...markerProps} />;
};

MapMarker.propTypes = {
  onDragEnd: PropTypes.func
};

export default MapMarker;
