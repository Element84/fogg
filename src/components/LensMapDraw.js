import React from 'react';
import PropTypes from 'prop-types';

import { useLens } from '../hooks';

import MapDraw from './MapDraw';

const LensMapDraw = props => {
  const { forwardedRefFeatureGroup, PopupContent } = props;

  const { geoSearch, map = {} } = useLens();
  const { updateSearch } = geoSearch;
  const { clearLayers, draw = {} } = map;
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
      ref={forwardedRefFeatureGroup}
      onCreated={handleOnDrawCreate}
      controlOptions={controlOptions}
      shapeOptions={shapeOptions}
      PopupContent={PopupContent}
      {...props}
    />
  );
};

LensMapDraw.propTypes = {
  forwardedRefFeatureGroup: PropTypes.object,
  controlOptions: PropTypes.object,
  PopupContent: PropTypes.any
};

const LensMapDrawWithRefs = React.forwardRef(function lensMapDraw (props, ref) {
  return <LensMapDraw {...props} forwardedRefFeatureGroup={ref} />;
});

LensMapDrawWithRefs.displayName = 'LensMapDrawWithRefs';

export default LensMapDrawWithRefs;
