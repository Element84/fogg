import React, { useEffect } from 'react';
import L from 'leaflet';
import { action } from '@storybook/addon-actions';

import Lens from '../../../components/Lens';
import Button from '../../../components/Button';
import { useLens } from '../../../hooks';
import { isDomAvailable } from '../../../lib/device';

import EarthSearchSidebarPanels from './EarthSearchSidebarPanels';
import {
  handleResolveOnEarthSearch,
  handleEarthSearchUseMapEffect,
  earthSearchAvailableFilters
} from './lens-story-util';

import geoJsonMgBrazil from '../../../../tests/fixtures/geojson/montes-claros-mg-brazil';

const DEFAULT_CENTER = {
  lat: 0,
  lng: 0
};

let customMapFeatureGroup;

if (isDomAvailable()) {
  customMapFeatureGroup = new L.FeatureGroup();
}

const SidebarWrapper = (props) => {
  const { geoSearch = {}, map = {} } = useLens();
  const { search } = geoSearch;
  const { addTileLayerToMap, clearTileLayers, clearTileLayer } = map;

  const populationEndpoint =
    'https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/GPW_Population_Density_2020/default/2018-11-08/EPSG3857_1km/{z}/{y}/{x}.png';

  useEffect(() => {
    search({
      geoJson: geoJsonMgBrazil,
      zoom: 5
    });

    addTileLayerToMap({
      url: populationEndpoint,
      options: {
        name: 'Population Density, 2020',
        attribution: '&copy; NASA - GPW_Population_Density_2020',
        format: 'png',
        tileSize: 256,
        maxZoom: 10,
        maxNativeZoom: 7,
        opacity: 0.8,
        featureGroup: customMapFeatureGroup,
        zIndex: 999
      }
    });
  }, []);

  function handleOnClearAllTileLayers () {
    clearTileLayers();
  }

  function handleClearPopulationDensity () {
    clearTileLayer({
      name: 'Population Density, 2020'
    });
  }

  return (
    <>
      <p>
        <Button onClick={handleOnClearAllTileLayers}>Clear Tile Layer</Button>
        <Button onClick={handleClearPopulationDensity}>
          Clear Population Density
        </Button>
      </p>
      <EarthSearchSidebarPanels {...props} />;
    </>
  );
};

const LensEarthSearchInitialSearch = () => {
  function customHandleOnCreated (layer, leafletElement) {
    action('Draw::onCreated')('Custom function triggered', layer);
    leafletElement.openPopup();
    return true;
  }

  const PopupContent = () => {
    return <div>Test</div>;
  };

  const layers = [
    {
      name: 'Open Street Maps',
      serviceName: 'open_street_map',
      type: 'service'
    }
  ];

  const services = [
    {
      name: 'open_street_map',
      format: 'png',
      attribution: '&copy; OpenStreetMap contributors',
      projections: 'epsg3857',
      maxZoom: 18,
      nativeZoom: 18,
      tileSize: 256,
      tileEndpoint: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
  ];

  return (
    <>
      <Lens
        projection="epsg3857"
        availableLayers={layers}
        availableServices={services}
        map="open_street_map"
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={2}
        resolveOnSearch={handleResolveOnEarthSearch}
        SidebarComponents={SidebarWrapper}
        useMapEffect={handleEarthSearchUseMapEffect}
        placeholder="Look stuffs on Earth Data"
        availableFilters={earthSearchAvailableFilters}
        draw={{
          controlOptions: {
            polygon: false,
            marker: false
          },
          onCreated: customHandleOnCreated,
          shapeOptions: {
            style: {
              color: '#ff0000',
              fill: false
            }
          }
        }}
        PopupContent={PopupContent}
      />
    </>
  );
};

export default LensEarthSearchInitialSearch;
