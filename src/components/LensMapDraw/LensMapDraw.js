import React from 'react';
import PropTypes from 'prop-types';

import { useLens } from '../../hooks';

import MapDraw from '../MapDraw';

const LensMapDraw = props => {
  const { PopupContent } = props;

  const { geoSearch, map = {} } = useLens();
  const { updateSearch } = geoSearch;
  const { clearLayers, draw = {}, mapFeatureGroup } = map;
  const { clearOnDraw, searchOnDraw, controlOptions, shapeOptions } = draw;

  /**
   * handleOnDrawCreate
   */

  async function handleOnDrawCreate (layer = {}, featureGroup) {
    const geoJson = layer.toGeoJSON();

    if (clearOnDraw) {
      clearLayers({
        featureGroup,
        excludeLayers: [layer]
      });
    }

    if (searchOnDraw) {
      updateSearch({
        geoJson,
        textInput: ''
      });
    }
  }

  return (
    <MapDraw
      onCreated={handleOnDrawCreate}
      controlOptions={controlOptions}
      shapeOptions={shapeOptions}
      PopupContent={PopupContent}
      featureGroup={mapFeatureGroup}
      {...props}
    />
  );
};

LensMapDraw.propTypes = {
  controlOptions: PropTypes.object,
  PopupContent: PropTypes.any
};

export default LensMapDraw;
