import React from 'react';
import Map from './Map';
import Marker from './MapMarker';

const MapPreview = () => {
  let lat = 0;
  let lng = 0;

  const mapSettings = {
    center: [lat, lng],
    zoom: 3
  };

  const markerSettings = {
    position: [lat, lng]
  };

  return (
    <figure>
      <div className="map-preview">
        <Map>
          <Marker />
        </Map>
        <figcaption>
          <p className="area-of-interest-wrapper">
            <strong className="area-of-interest">Area of Interest</strong>
            <p className="map-preview-marker-location">
              {/* {ALEXANDRIA.lat} &deg;N, {ALEXANDRIA.lng} &deg;W */}
            </p>
          </p>
        </figcaption>
      </div>
    </figure>
  );
};

export default MapPreview;
