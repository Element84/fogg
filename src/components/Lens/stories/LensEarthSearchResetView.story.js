import React from 'react';

import Lens from '../../../components/Lens';

import EarthSearchSidebarPanelsResetView from './EarthSearchSidebarPanelsResetView';
import {
  handleResolveOnEarthSearch,
  handleEarthSearchUseMapEffect,
  earthSearchAvailableFilters
} from './lens-story-util';

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

const EarthSearchNoFilter = () => {
  return (
    <>
      <Lens
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={2}
        resolveOnSearch={handleResolveOnEarthSearch}
        SidebarComponents={EarthSearchSidebarPanelsResetView}
        useMapEffect={handleEarthSearchUseMapEffect}
        placeholder="Look stuffs on Earth Data"
        availableFilters={earthSearchAvailableFilters}
      />
    </>
  );
};

export default EarthSearchNoFilter;
