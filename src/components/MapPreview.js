import React from 'react';
import PropTypes from 'prop-types';
import Map from './Map';
import Marker from './MapMarker';

const MapPreview = props => {
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
    ...props,
    position: [ALEXANDRIA.lat, ALEXANDRIA.lng],
    draggable: false
  };

  return (
    <>
      <Map {...mapSettings} />
      <Marker {...markerSettings} />
      <h1>Area of Interest</h1>
    </>
  );
};

export default MapPreview;
