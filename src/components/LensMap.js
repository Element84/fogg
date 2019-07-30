import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LensContext } from '../context';

import Map from './Map';

const LensMap = React.forwardRef(({ children, ...rest }, ref) => {
  const { layers = {} } = useContext(LensContext) || {};

  const { handlers: layersHandlers = {} } = layers;
  const { toggleLayer } = layersHandlers;

  const mapSettings = {
    toggleLayer,
    layers,
    ...rest
  };

  return (
    <Map ref={ref} className="lens-map" {...mapSettings}>
      {children}
    </Map>
  );
});

LensMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default LensMap;
