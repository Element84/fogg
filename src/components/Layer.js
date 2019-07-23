import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import { TileLayer, GeoJSON } from 'react-leaflet';

const getKey = layerKey => {
  const newKey = uniqueId(layerKey);
  return newKey;
};

const Layer = ({ layer, layerKey }) => {
  if (layer.type === 'service') {
    return <TileLayer {...layer.service} />;
  }
  if (layer.type === 'data') {
    if (
      layer.data.type === 'geojson' &&
      !!Object.keys(layer.data.data).length
    ) {
      let GeoJSONdata = layer.data.data;
      return (
        <GeoJSON
          key={getKey(layerKey)}
          data={GeoJSONdata}
          {...layer.data.options}
        />
      );
    }
  }
  return null;
};

Layer.propTypes = {
  layer: PropTypes.shape({
    data: PropTypes.shape({
      type: PropTypes.string.isRequired,
      data: PropTypes.shape({}),
      options: PropTypes.shape({})
    }),
    id: PropTypes.string,
    isActive: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    service: PropTypes.shape({}),
    serviceName: PropTypes.string,
    type: PropTypes.string.isRequired
  }),
  layerKey: PropTypes.string
};

export default Layer;
