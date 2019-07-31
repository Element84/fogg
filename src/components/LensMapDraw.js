import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LensContext } from '../context';

import MapDraw from './MapDraw';

const LensMapDraw = props => {
  const { forwardedRef } = props;
  const { lens = {} } = useContext(LensContext) || {};

  const { handlers: lensHandlers = {} } = lens;
  const { handleOnCreated } = lensHandlers;

  return <MapDraw ref={forwardedRef} onCreated={handleOnCreated} {...props} />;
};

LensMapDraw.propTypes = {
  forwardedRef: PropTypes.object
};

const LensMapDrawWithRefs = React.forwardRef(function lensMapDraw (props, ref) {
  return <LensMapDraw {...props} forwardedRef={ref} />;
});

LensMapDrawWithRefs.displayName = 'LensMapDrawWithRefs';

export default LensMapDrawWithRefs;
