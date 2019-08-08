import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LensContext } from '../context';

import { latLngPositionFromCenter } from '../lib/leaflet';

const LensSidebarComponents = ({ SidebarComponents, ...rest }) => {
  const { lens = {}, filters = {}, layers = {} } =
    useContext(LensContext) || {};

  const {
    handlers: lensHandlers = {},
    results,
    mapConfig = {},
    numberOfResults
  } = lens;
  const { loadMoreResults, clearActiveSearch } = lensHandlers;
  const { center = {}, geoJson } = mapConfig;

  const { handlers: layersHandlers = {} } = layers;
  const { toggleLayer, getDataForLayers } = layersHandlers;

  if (!SidebarComponents) return null;

  return (
    <SidebarComponents
      mapPosition={latLngPositionFromCenter(center)}
      geoJson={geoJson}
      results={results}
      loadMoreResults={loadMoreResults}
      clearActiveSearch={clearActiveSearch}
      filters={filters}
      layers={layers}
      toggleLayer={toggleLayer}
      getDataForLayers={getDataForLayers}
      numberOfResults={numberOfResults}
      {...rest}
    />
  );
};

LensSidebarComponents.propTypes = {
  SidebarComponents: PropTypes.any
};

export default LensSidebarComponents;
