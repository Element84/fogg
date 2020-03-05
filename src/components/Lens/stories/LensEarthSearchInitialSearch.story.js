import React, { useEffect } from 'react';
import { action } from '@storybook/addon-actions';

import Lens from '../../../components/Lens';
import { useLens } from '../../../hooks';

import EarthSearchSidebarPanels from './EarthSearchSidebarPanels';
import {
  handleResolveOnEarthSearch,
  handleEarthSearchUseMapEffect,
  earthSearchAvailableFilters
} from './lens-story-util';

import geoJsonMgBrazil from '../../../../tests/fixtures/geojson/montes-claros-mg-brazil';

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

const SidebarWrapper = props => {
  const { geoSearch = {} } = useLens();
  const { search } = geoSearch;

  useEffect(() => {
    search({
      geoJson: geoJsonMgBrazil,
      zoom: 5
    });
  }, []);

  return <EarthSearchSidebarPanels {...props} />;
};

const LensEarthSearchInitialSearch = () => {
  function customHandleOnCreated (layer, leafletElement) {
    action('Draw::onCreated')('Custom function triggered', layer);
    leafletElement.openPopup();
    return true;
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
        SidebarComponents={SidebarWrapper}
        useMapEffect={handleEarthSearchUseMapEffect}
        placeholder="Look stuffs on Earth Data"
        availableFilters={earthSearchAvailableFilters}
        draw={{
          controlOptions: {
            polygon: false,
            marker: false
          },
          onCreated: customHandleOnCreated,
          shapeOptions: {
            style: {
              color: '#ff0000',
              fill: false
            }
          }
        }}
        PopupContent={PopupContent}
      />
    </>
  );
};

export default LensEarthSearchInitialSearch;
