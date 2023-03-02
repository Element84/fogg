import React from 'react';

import Lens from '..';

import EarthSearchSidebarPanels from './EarthSearchSidebarPanels';
import {
  handleResolveOnEarthSearch,
  handleEarthSearchUseMapEffect,
  earthSearchAvailableFilters
} from './lens-story-util';

const LensEarthSearchUtc = () => {
  return (
    <>
      <Lens
        defaultZoom={2}
        resolveOnSearch={handleResolveOnEarthSearch}
        SidebarComponents={EarthSearchSidebarPanels}
        useMapEffect={handleEarthSearchUseMapEffect}
        placeholder="Look stuffs on Earth Data"
        availableFilters={earthSearchAvailableFilters}
        allowStartAfterEndDate={false}
        disableFutureDates={true}
      />
    </>
  );
};

export default LensEarthSearchUtc;
