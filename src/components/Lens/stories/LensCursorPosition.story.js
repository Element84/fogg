import React from 'react';

import Lens from '..';
import { handleEarthSearchUseMapEffect } from './lens-story-util';

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

const LensCursorPosition = () => {
  const layers = [
    {
      name: 'Open Street Maps',
      serviceName: 'open_street_map',
      type: 'service'
    }
  ];

  const services = [
    {
      name: 'open_street_map',
      format: 'png',
      attribution: '&copy; OpenStreetMap contributors',
      projections: 'epsg3857',
      maxZoom: 18,
      nativeZoom: 18,
      tileSize: 256,
      tileEndpoint: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
  ];

  const mapControls = {
    cursorPosition: true
  };

  return (
    <>
      <Lens
        defaultCenter={DEFAULT_CENTER}
        projection="epsg3857"
        availableLayers={layers}
        availableServices={services}
        useMapEffect={handleEarthSearchUseMapEffect}
        map="open_street_map"
        search={false}
        mapControls={mapControls}
      />
    </>
  );
};

export default LensCursorPosition;
