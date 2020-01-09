import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { TileLayer, GeoJSON } from 'react-leaflet';
import moment from 'moment';

const getKey = layerKey => {
  const newKey = uniqueId(layerKey);
  return newKey;
};

const Layer = ({ layer = {}, layerKey, activeDateRange }) => {
  const { type, data = {} } = layer;

  if (type === 'service') {
    if (!layer.service) {
      throw new Error(`Layer error: can not find service ${layer.serviceName}`);
    }
    return <TileLayer {...layer.service} />;
  }
  if (type === 'data') {
    if (data.type === 'geojson' && !!Object.keys(data.data).length) {
      let features = data.data.features || data.data.geometries;
      if (!features) features = [];

      const GeoJSONdata = features.filter(geoItem => {
        let feature = null;

        if (geoItem.properties && geoItem.properties.time) {
          const eventTime = geoItem.properties.time;
          if (activeDateRange && activeDateRange.end) {
            if (
              moment(eventTime).isSameOrBefore(
                activeDateRange.end,
                'millisecond'
              )
            ) {
              feature = geoItem;
            }
          }
          return feature;
        }

        return true;
      });

      return (
        <GeoJSON key={getKey(layerKey)} data={GeoJSONdata} {...data.options} />
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
  layerKey: PropTypes.string,
  activeDateRange: PropTypes.shape({
    end: PropTypes.number
  })
};

export default Layer;
