import React from 'react';
import Map from './Map';
import Marker from './MapMarker';

const MapPreview = () => {
  // put map in smaller area with all of its stuff
  // add line at the bottom with area of interest and coordinates

  const ALEXANDRIA = {
    lat: 38.8048,
    lng: -77.0469
  };

  const mapSettings = {
    center: [ALEXANDRIA.lat, ALEXANDRIA.lng],
    zoom: 5
  };

  const markerSettings = {
    position: [ALEXANDRIA.lat, ALEXANDRIA.lng],
    draggable: false
  };

  return (
    <div className="map-preview-container">
      <Map {...mapSettings}>
        <Marker {...markerSettings} />
      </Map>
      <hr />
      <h1>Area of Interest</h1>
      <p className="map-preview-marker-location">
        {ALEXANDRIA.lat} &deg;N, {ALEXANDRIA.lng} &deg;W
      </p>
    </div>
  );
};

export default MapPreview;
