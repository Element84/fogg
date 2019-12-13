import React from 'react';
import PropTypes from 'prop-types';

import { useLens } from '../hooks';

import Map from './Map';

const LensMap = ({ children, forwardedRef, ...rest }) => {
  const { map } = useLens();
  const { defaultZoom, defaultCenter, maxZoom, minZoom } = map;

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
