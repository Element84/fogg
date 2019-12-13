import React from 'react';
import PropTypes from 'prop-types';

import { useLens } from '../hooks';

import MapDraw from './MapDraw';

const LensMapDraw = props => {
  const { forwardedRef, controlOptions, PopupContent } = props;

  const { geoSearch, map = {}, lens = {} } = useLens();
  const { search } = geoSearch;
  const { clearLayers } = map;
  const { draw = {} } = lens;
  const { clearOnDraw, searchOnDraw } = draw;

  /**
   * handleOnDrawCreate
   */

  async function handleOnDrawCreate(layer = {}, featureGroup) {
    const geoJson = layer.toGeoJSON();

    if (clearOnDraw) {
      clearLayers({
        featureGroup,
        excludeLayers: [layer]
      });
    }

    if (searchOnDraw) {
      search({
        geoJson
      });
    }
  }

  return (
    <MapDraw
      ref={forwardedRef}
      onCreated={handleOnDrawCreate}
      controlOptions={controlOptions}
      PopupContent={PopupContent}
      {...props}
    />
  );
};

LensMapDraw.propTypes = {
  forwardedRef: PropTypes.object,
  controlOptions: PropTypes.object,
  PopupContent: PropTypes.any
};

const LensMapDrawWithRefs = React.forwardRef(function lensMapDraw (props, ref) {
  return <LensMapDraw {...props} forwardedRef={ref} />;
});

LensMapDrawWithRefs.displayName = 'LensMapDrawWithRefs';

export default LensMapDrawWithRefs;
