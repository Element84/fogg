import React, { useEffect, useState } from 'react';

import Lens from '../../../components/Lens';

import EarthSearchSidebarPanels from './EarthSearchSidebarPanels';
import {
  handleResolveOnEarthSearch,
  handleEarthSearchUseMapEffect,
  earthSearchAvailableFilters
} from './lens-story-util';

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

const LensEarthSearchAvailableLayers = () => {
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
    },
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

  const [layers, updateLayers] = useState([
    {
      name: 'MODIS Aqua',
      serviceName: 'MODIS_Aqua_CorrectedReflectance_TrueColor_Dynamic',
      type: 'service'
    }
  ]);

  useEffect(() => {
    setTimeout(() => {
      updateLayers([
        {
          name: 'Open Street Maps',
          serviceName: 'open_street_map',
          type: 'service'
        }
      ]);
    }, [5000]);
  }, []);
  return (
    <>
      <Lens
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={2}
        resolveOnSearch={handleResolveOnEarthSearch}
        SidebarComponents={EarthSearchSidebarPanels}
        useMapEffect={handleEarthSearchUseMapEffect}
        placeholder="Look stuffs on Earth Data"
        availableFilters={earthSearchAvailableFilters}
        projection="epsg3857"
        availableLayers={layers}
        availableServices={services}
      />
    </>
  );
};

export default LensEarthSearchAvailableLayers;
