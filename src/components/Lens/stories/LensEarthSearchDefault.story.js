import React from 'react';

import Lens from '../../../components/Lens';

import EarthSearchSidebarPanels from './EarthSearchSidebarPanels';
import {
  handleResolveOnEarthSearch,
  handleEarthSearchUseMapEffect,
  earthSearchAvailableFiltersWithDisplayList
} from './lens-story-util';

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

const LensEarthSearchDefault = () => {
  return (
    <>
      <Lens
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={2}
        resolveOnSearch={handleResolveOnEarthSearch}
        SidebarComponents={EarthSearchSidebarPanels}
        useMapEffect={handleEarthSearchUseMapEffect}
        placeholder="Look stuffs on Earth Data"
        availableFilters={earthSearchAvailableFiltersWithDisplayList}
      />
    </>
  );
};

export default LensEarthSearchDefault;
