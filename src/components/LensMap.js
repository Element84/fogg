import React from 'react';
import PropTypes from 'prop-types';

import Map from './Map';

const LensMap = ({ children, forwardedRef, ...rest }) => {
  const mapSettings = {
    ...rest
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
