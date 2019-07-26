import React, { useContext } from 'react';
import { LensContext } from '../context';

import { latLngPositionFromCenter } from '../lib/leaflet';

import Map from './Map';

const LensMap = ({ children, ...rest }) => {
  const { lens = {}, layers = {} } = useContext(LensContext) || {}

  const { mapConfig = {} } = lens;
  const { center = {} } = mapConfig;

  const { handlers: layersHandlers } = layers;
  const { toggleLayer } = layersHandlers;

  const mapSettings = {
    toggleLayer,
    layers,
    center: latLngPositionFromCenter(center),
    ...rest
  };

  return (
    <Map className="lens-map" {...mapSettings}>
      {children}
    </Map>
  );
};

export default LensMap;