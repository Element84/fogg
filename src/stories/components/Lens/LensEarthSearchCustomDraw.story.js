import React from 'react';
import { action } from '@storybook/addon-actions';

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

const LensEarthSearchCustomDraw = () => {
  function customHandleOnCreated (layer, leafletElement) {
    action('Draw::onCreated')('Custom function triggered', layer);
    leafletElement.openPopup();
  }

  const PopupContent = () => {
    return <div>Test</div>;
  };

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
        drawControlOptions={{
          polygon: false,
          marker: false
        }}
        onCreatedDraw={customHandleOnCreated}
        PopupContent={PopupContent}
      />
    </>
  );
};

export default LensEarthSearchCustomDraw;
