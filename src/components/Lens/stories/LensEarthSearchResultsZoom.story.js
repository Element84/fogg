import React from 'react';

import Lens from '../../../components/Lens';

import EarthSearchSidebarPanelZoomFeature from './EarthSearchSidebarPanelZoomFeature';
import {
  handleResolveOnEarthSearch,
  handleEarthSearchUseMapEffect
} from './lens-story-util';

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

const LensEarthSearchResultsZoom = () => {
  return (
    <>
      <Lens
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={2}
        resolveOnSearch={handleResolveOnEarthSearch}
        SidebarComponents={EarthSearchSidebarPanelZoomFeature}
        useMapEffect={handleEarthSearchUseMapEffect}
        placeholder="Somewhere in Brazil"
      />
    </>
  );
};

export default LensEarthSearchResultsZoom;
