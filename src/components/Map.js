import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css'; // This needs to be included for the map to actually work when compiled
import L from 'leaflet';
import { Map as BaseMap, LayersControl, ZoomControl } from 'react-leaflet';
import 'proj4';
import 'proj4leaflet';
import 'leaflet-active-area';

import MapService from '../models/map-service';

import { isDomAvailable } from '../lib/util';
import { buildLayerSet, layerSetHasSingleLayer } from '../lib/leaflet';

import Layer from './Layer';

const Map = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    map = 'blue_marble',
    center = [0, 0],
    zoom = 2,
    maxZoom,
    minZoom,
    projection = 'epsg4326',
    projections = [],
    services = [],
    layers,
    toggleLayer,
    hideNativeLayers,
    useMapEffect
  } = props;

  let mapClassName = `map ${className || ''}`;

  if (hideNativeLayers) {
    mapClassName = `${mapClassName} map-hide-layers-control`;
  }

  useEffect(() => {
    if (!isDomAvailable()) return;
    const { current = {} } = ref;
    const { leafletElement = {} } = current;
    if (typeof useMapEffect === 'function') {
      useMapEffect({
        leafletElement
      });
    }
  }, [map, ref]);

  if (!isDomAvailable()) {
    return (
      <div className={mapClassName}>
        <p className="map-loading">Loading map...</p>
      </div>
    );
  }

  // Set up a new map service given the name of the map

  const mapService = new MapService(projection, {
    services,
    projections
  });

  const mapLayers = buildLayerSet(layers, mapService.services);
  const { base: baseLayer = [] } = mapLayers;
  const baseService = baseLayer && baseLayer[0] && baseLayer[0].service;
  const {
    maxZoom: baseMaxZoom,
    minZoom: baseMinZoom,
    maxNativeZoom: baseMaxNativeZoom
  } = baseService || {};

  const mapSettings = {
    className: 'map-base',
    center,
    zoom,
    maxZoom: baseMaxZoom || maxZoom,
    minZoom: baseMinZoom || minZoom,
    maxNativeZoom: baseMaxNativeZoom,
    zoomControl: false
  };

  // Only set up a new CRS if one is provided, otherwise fallback to the leaflet defaults (3857)

  if (mapService.crs) {
    mapSettings.crs = new L.Proj.CRS(
      mapService.crs.code,
      mapService.crs.definition,
      {
        origin: mapService.crs.origin,
        resolutions: mapService.crs.resolutions,
        bounds: L.Bounds(mapService.crs.bounds)
      }
    );
  }

  function handleBaseLayerChange (id) {
    toggleLayer(id);
  }

  mapSettings.handleBaseLayerChange = handleBaseLayerChange;

  const singleLayer = layerSetHasSingleLayer(mapLayers);

  return (
    <div className={mapClassName}>
      <BaseMap ref={ref} {...mapSettings}>
        {children}
        {singleLayer && <Layer layer={mapLayers.base[0]} />}
        {!singleLayer && (
          <LayersControl>
            {mapLayers.base.map(layer => (
              <LayersControl.BaseLayer
                key={`base_layer_${layer.id}`}
                name={layer.name}
                checked={layer.isActive}
              >
                <Layer layerKey={`base_layer_item_${layer.id}`} layer={layer} />
              </LayersControl.BaseLayer>
            ))}
            {mapLayers.overlay.map(layer => (
              <LayersControl.Overlay
                key={`overlay_layer_${layer.id}`}
                name={layer.name}
                checked={layer.isActive}
              >
                <Layer
                  layerKey={`overlay_layer_item_${layer.id}`}
                  layer={layer}
                />
              </LayersControl.Overlay>
            ))}
          </LayersControl>
        )}

        <ZoomControl position="bottomright" />
      </BaseMap>
    </div>
  );
});

Map.propTypes = {
  center: PropTypes.array,
  children: PropTypes.node,
  map: PropTypes.string,
  zoom: PropTypes.number,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  className: PropTypes.string,
  projection: PropTypes.string,
  projections: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  services: PropTypes.array,
  layers: PropTypes.shape({
    base: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        serviceName: PropTypes.string,
        type: PropTypes.string.isRequired
      })
    ).isRequired,
    overlay: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        serviceName: PropTypes.string,
        type: PropTypes.string.isRequired
      })
    ),
    handlers: PropTypes.shape({
      toggleLayer: PropTypes.func.isRequired
    }).isRequired
  }),
  toggleLayer: PropTypes.func,
  hideNativeLayers: PropTypes.bool,
  useMapEffect: PropTypes.func
};

export default Map;
