import React from 'react';

import Lens from '../../../components/Lens';

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

const LensBasemap = () => {
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

  return (
    <>
      <Lens
        defaultCenter={ALEXANDRIA}
        defaultZoom={8}
        projection="epsg3857"
        availableLayers={layers}
        availableServices={services}
        map="open_street_map"
        search={false}
      />
    </>
  );
};

export default LensBasemap;
