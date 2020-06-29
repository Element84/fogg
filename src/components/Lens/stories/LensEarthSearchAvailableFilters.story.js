import React, { useEffect, useState } from 'react';

import Lens from '../../../components/Lens';

import EarthSearchSidebarPanels from './EarthSearchSidebarPanels';
import {
  handleResolveOnEarthSearch,
  handleEarthSearchUseMapEffect,
  earthSearchAvailableFilters
} from './lens-story-util';

const LensEarthSearchAvailableFilters = () => {
  const [filters, updateFilters] = useState(earthSearchAvailableFilters);

  const updatedFilters = [
    {
      label: 'Cloud Cover',
      id: 'properties/eo:cloud_cover',
      type: 'range',
      range: {
        min: 0.1,
        max: 0.9
      },
      defaultValue: {
        min: 0.2,
        max: 0.8
      }
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      updateFilters(updatedFilters);
    }, [5000]);
  }, []);

  return (
    <>
      <Lens
        defaultZoom={2}
        resolveOnSearch={handleResolveOnEarthSearch}
        SidebarComponents={EarthSearchSidebarPanels}
        useMapEffect={handleEarthSearchUseMapEffect}
        placeholder="Look stuffs on Earth Data"
        availableFilters={filters}
      />
    </>
  );
};

export default LensEarthSearchAvailableFilters;
