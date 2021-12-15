import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { FaRocket } from 'react-icons/fa';
import { MdZoomIn } from 'react-icons/md';

import Panel from '../../../components/Panel';
import ItemList from '../../../components/ItemList';

import { isDomAvailable } from '../../../lib/device';

import GEOJSON_MONTES_CLAROS_POLYGON from '../../../../tests/fixtures/geojson/montes-claros-mg-brazil';
import GEOJSON_GRAO_MOGOL_POLYGON from '../../../../tests/fixtures/geojson/grao-mogol-mg-brazil';

// Lens lets us pass in a component for our Sidebar. The component
// takes a few props as arguments such as the given results and some
// actions that allow us to create a unique sidebar experience for
// whatever app thats getting built

let customMapFeatureGroup;

if (isDomAvailable()) {
  customMapFeatureGroup = new L.FeatureGroup();
}

const EarthSearchSidebarPanelZoomFeature = ({
  geoSearch = {},
  geoFilters = {},
  map = {}
}) => {
  const {
    addShapeToMap,
    zoomToBounds
  } = map;

  const cannedResults = [{
    label: 'Somewhere in Brazil - click to zoom',
    sublabels: [
      `GeoJSON: ${JSON.stringify(GEOJSON_MONTES_CLAROS_POLYGON)}`,
      'Sentinel Grid Square: PB',
      `Date: ${new Date()}`
    ],
    icon: <MdZoomIn/>,
    onClick: () => handleAddShapeToMapAndZoom(GEOJSON_MONTES_CLAROS_POLYGON, customMapFeatureGroup),
    className: 'lens-item-pointer'
  }, {
    label: 'Somewhere else in Brazil - click to zoom',
    sublabels: [
      `GeoJSON: ${JSON.stringify(GEOJSON_GRAO_MOGOL_POLYGON)}`,
      'Sentinel Grid Square: PB',
      `Date: ${new Date().getUTCDate()}`
    ],
    icon: <MdZoomIn/>,
    onClick: () => handleAddShapeToMapAndZoom(GEOJSON_GRAO_MOGOL_POLYGON, customMapFeatureGroup),
    className: 'lens-item-pointer'
  }];

  function handleAddShapeToMapAndZoom (geoJson, featureGroup) {
    addShapeToMap({
      panToShape: false,
      geoJson,
      zoom: 4,
      clearOtherLayers: true,
      featureGroup
    });

    zoomToBounds({
      layerBounds: featureGroup.getBounds()
    });
  }

  return (
    <Panel
      header={
        <>
          {'Results 2 '}
          <FaRocket />
        </>
      }
    >
      <ItemList items={cannedResults} />
    </Panel>
  );
};

EarthSearchSidebarPanelZoomFeature.propTypes = {
  geoSearch: PropTypes.object,
  geoFilters: PropTypes.object,
  map: PropTypes.object
};

export default EarthSearchSidebarPanelZoomFeature;
