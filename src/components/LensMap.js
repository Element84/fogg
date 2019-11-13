import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { LensContext } from '../context';

import Map from './Map';

const LensMap = ({ children, forwardedRef, ...rest }) => {
  const { lens = {} } = useContext(LensContext) || {};
  const { mapConfig = {} } = lens;
  const { defaultZoom, defaultCenter, maxZoom, minZoom } = mapConfig;

  const mapSettings = {
    ...rest,
    zoom: defaultZoom,
    maxZoom,
    minZoom,
    center: defaultCenter && [defaultCenter.lat, defaultCenter.lng]
  };

  return (
    <Map ref={forwardedRef} className="lens-map" {...mapSettings}>
      {children}
    </Map>
  );
};

LensMap.propTypes = {
  forwardedRef: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const LensMapWithRefs = React.forwardRef(function lensMap (props, ref) {
  return <LensMap {...props} forwardedRef={ref} />;
});

LensMapWithRefs.displayName = 'LensMapWithRefs';

export default LensMapWithRefs;
