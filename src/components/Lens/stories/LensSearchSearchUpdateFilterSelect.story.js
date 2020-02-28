import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

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

const LensEarthSearchDefault = () => {
  return (
    <>
      <Lens
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={2}
        resolveOnSearch={handleResolveOnEarthSearch}
        SidebarComponents={SidebarPanelsWrapper}
        useMapEffect={handleEarthSearchUseMapEffect}
        placeholder="Look stuffs on Earth Data"
        availableFilters={earthSearchAvailableFilters}
      />
    </>
  );
};

export default LensEarthSearchDefault;

const SidebarPanelsWrapper = props => {
  const { filters, search } = props;
  const { unsaved = [] } = filters || {};

  // Make the updating of the unsaved IDs dependent of a string that
  // consists of the unsaved IDs to avoid the useEffect running each time
  // as the dependency array doesnt work well with arrays generally

  const unsavedIdsString = unsaved.map(({ id } = {}) => id).join();

  // In order to effectively update any filters upon change, we want to
  // trigger a new search any time we discover there's unsaved filter IDs

  useEffect(() => {
    if (unsavedIdsString.length > 0) {
      search({
        saveUnsavedFilters: true,
        closeFilters: false
      });
    }
  }, [unsavedIdsString, search]);
  return <EarthSearchSidebarPanels {...props} />;
};

SidebarPanelsWrapper.propTypes = {
  filters: PropTypes.object,
  search: PropTypes.func
};
