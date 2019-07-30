import React, { useContext } from 'react';
import { LensContext } from '../context';

import MapDraw from './MapDraw';

const LensMapDraw = (props, ref) => {
  const { lens = {} } = useContext(LensContext) || {};

  const { handlers: lensHandlers = {} } = lens;
  const { handleOnCreated } = lensHandlers;

  return <MapDraw ref={ref} onCreated={handleOnCreated} {...props} />;
};

export default React.forwardRef(LensMapDraw);
