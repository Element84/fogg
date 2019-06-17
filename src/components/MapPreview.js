import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Map from './Map';
import Marker from './MapMarker';

const MapPreview = ({ position }) => {
  const [mapPreviewState, updateMapPreviewState] = useState();
  const { lat = 0, lng = 0 } = position;

  const mapSettings = {
    center: [lat, lng],
    zoom: 3
  };

  const markerSettings = {
    position: [lat, lng]
  };

  return (
    <figure className="map-preview">
      <Map {...mapSettings}>
        <Marker {...markerSettings} />
      </Map>
      <figcaption>
        <p>
          <strong className="map-preview-area-of-interest">
            Area of Interest
          </strong>
        </p>
        <p className="map-preview-marker-location">
          {lat} &deg;N, {lng} &deg;W
        </p>
      </figcaption>
    </figure>
  );
};

MapPreview.propTypes = {
  position: PropTypes.object
};

export default MapPreview;
