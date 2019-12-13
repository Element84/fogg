import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { LensContext, LayersContext } from '../context';

import { useLens } from '../hooks';

const LensSidebarComponents = ({ SidebarComponents, ...rest }) => {
  const { geoSearch = {} } = useLens();

  const { filters = {} } = useContext(LensContext) || {};
  const { layers = {}, getDataForLayers, toggleLayer } =
    useContext(LayersContext) || {};

  if (!SidebarComponents) return null;

  return (
    <SidebarComponents
      geoSearch={geoSearch}


      filters={filters}
      layers={layers}
      toggleLayer={toggleLayer}
      getDataForLayers={getDataForLayers}
      {...rest}
    />
  );
};

LensSidebarComponents.propTypes = {
  SidebarComponents: PropTypes.any
};

export default LensSidebarComponents;
