import React from 'react';

import Lens from '../../../components/Lens';

import EarthSearchSidebarPanels from './EarthSearchSidebarPanels';
import {
  handleResolveOnEarthSearch,
  handleEarthSearchUseMapEffect,
  earthSearchAvailableFilters
} from './lens-story-util';

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

const LensEarthSearchDateOnly = props => {
  return (
    <>
      <Lens
        defaultCenter={ALEXANDRIA}
        defaultZoom={2}
        resolveOnSearch={handleResolveOnEarthSearch}
        SidebarComponents={EarthSearchSidebarPanels}
        search={true}
        searchType="daterange"
        useMapEffect={handleEarthSearchUseMapEffect}
        placeholder="Look stuffs on Earth Data"
        availableFilters={earthSearchAvailableFilters}
        {...props}
      />
    </>
  );
};

export default LensEarthSearchDateOnly;
