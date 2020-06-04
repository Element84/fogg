import React from 'react';

import Lens from '../../../components/Lens';
import EarthSearchSidebarPanels from './EarthSearchSidebarPanels';
import {
  handleResolveOnEarthSearch,
  handleEarthSearchUseMapEffect
} from './lens-story-util';

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

const LensEarthSearchDynamicLayerDate = (props) => {
  const layers = [
    {
      name: 'MODIS Aqua',
      serviceName: 'MODIS_Aqua_CorrectedReflectance_TrueColor_Dynamic',
      type: 'service'
    }
  ];

  const services = [
    {
      name: 'MODIS_Aqua_CorrectedReflectance_TrueColor_Dynamic',
      product: 'MODIS_Aqua_CorrectedReflectance_TrueColor',
      projections: 'epsg3857',
      time: '2018-11-08',
      format: 'jpg',
      attribution: '&copy; NASA - MODIS - Corrected Reflectance (True Color)',
      tileSize: 256,
      tileEndpoint:
        'https://gibs-{s}.earthdata.nasa.gov/wmts/{projection}/best/{product}/default/{time}/{projectionResolution}/{z}/{y}/{x}.{format}',
      resolution: '250m',
      maxZoom: 18,
      maxNativeZoom: 9,
      enableDynamicTime: true
    }
  ];

  return (
    <>
      <Lens
        defaultCenter={ALEXANDRIA}
        defaultZoom={3}
        resolveOnSearch={handleResolveOnEarthSearch}
        SidebarComponents={EarthSearchSidebarPanels}
        search={true}
        projection="epsg3857"
        searchType="daterange"
        useMapEffect={handleEarthSearchUseMapEffect}
        availableLayers={layers}
        availableServices={services}
        defaultDateRange={{
          start: 1568260800000,
          end: 1569007834750
        }}
        disableFutureDates={true}
        {...props}
      />
    </>
  );
};

export default LensEarthSearchDynamicLayerDate;
