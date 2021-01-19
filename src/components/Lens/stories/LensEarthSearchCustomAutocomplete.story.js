import React from 'react';
import { action } from '@storybook/addon-actions';
import { geocodePlacename } from '../../../lib/search';
import { resolveMostRecent } from '../../../lib/request';

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

async function resolveAutoComplete (query) {
  const response = await resolveMostRecent(geocodePlacename(query));

  const { candidates = [] } = response;
  action('custom autocomplete function')(query);

  return candidates.map(mapGeocodeCandidates);
}

function mapGeocodeCandidates ({ address, location } = {}) {
  return {
    label: address,
    sublabel: `Location: ${location.x}, ${location.y}`,
    value: location
  };
}

const LensEarthSearchCustomAutocomplete = () => {
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
        resolveOnAutocomplete={resolveAutoComplete}
      />
    </>
  );
};

export default LensEarthSearchCustomAutocomplete;
