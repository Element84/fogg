import React from 'react';
import PropTypes from 'prop-types';

import { useLens } from '../../hooks';

import Map from '../Map';

const LensMap = ({ children, forwardedRef, useMapEffect, ...rest }) => {
  const lens = useLens();
  const { map, activeDateRange = {} } = lens;
  const { mapConfig = {}, services, projection, refMap } = map;
  const { defaultZoom, defaultCenter, maxZoom, minZoom } = mapConfig;

  function handleUseMapEffect (mapOptions) {
    if (typeof useMapEffect === 'function') {
      useMapEffect({
        ...mapOptions,
        lens
      });
    }
  }

  const mapSettings = {
    ...rest,
    zoom: defaultZoom,
    maxZoom,
    minZoom,
    center: defaultCenter && [defaultCenter.lat, defaultCenter.lng],
    services,
    projection,
    activeDateRange,
    useMapEffect: handleUseMapEffect
  };

  return (
    <Map ref={refMap} className="lens-map" {...mapSettings}>
      {children}
    </Map>
  );
};

LensMap.propTypes = {
  forwardedRef: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  useMapEffect: PropTypes.func
};

const LensMapWithRefs = React.forwardRef(function lensMap (props, ref) {
  return <LensMap {...props} forwardedRef={ref} />;
});

LensMapWithRefs.displayName = 'LensMapWithRefs';

export default LensMapWithRefs;
