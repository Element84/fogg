import React, { useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css'; // This needs to be included for the map to actually work when compiled
import L from 'leaflet';
import { Map as BaseMap, LayersControl, ZoomControl } from 'react-leaflet';
import 'proj4';
import 'proj4leaflet';
import 'leaflet-active-area';
import 'leaflet-editable';

import MapService from '../../models/map-service';
import { LayersContext } from '../../context';

import { isDomAvailable } from '../../lib/device';
import { buildLayerSet } from '../../lib/layers';
import { getBoundsFromGeoJson, currentLeafletRef } from '../../lib/leaflet';

import Layer from '../Layer';

const Map = (props) => {
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
    hideNativeLayers = true,
    useMapEffect,
    forwardedRef,
    activeDateRange,
    fitGeoJson
  } = props;

  const { layers = {}, toggleLayer } = useContext(LayersContext) || {};
  const mapRefBackup = useRef();
  const mapControlRef = useRef();

  const mapRef = forwardedRef || mapRefBackup;

  let mapClassName = `map ${className || ''}`;

  if (hideNativeLayers) {
    mapClassName = `${mapClassName} map-hide-layers-control`;
  }

  // Reset map size on mount to ensure it fills parent container
  useEffect(()=>{
    const leafletElement = currentLeafletRef(mapRef);
    if (!leafletElement) return;
    leafletElement.invalidateSize(true);
  },[]);

  useEffect(() => {
    if (!mapRef) return;

    const mapEffect = Array.isArray(useMapEffect)
      ? useMapEffect
      : [useMapEffect];

    const leafletElement = currentLeafletRef(mapRef);

    const { current: layersControl } = mapControlRef;

    mapEffect.forEach((effect) => {
      if (typeof effect === 'function') {
        effect({
          leafletControls: {
            tileLayer: L.tileLayer
          },
          leafletElement,
          layersControl
        });
      }
    });
  }, [map, mapRef]);

  // If the user passes in an argument of fitGeoJson, we'll use that
  // geoJson value to find the bounds and fit the map view to them

  useEffect(() => {
    if (!fitGeoJson || !mapRef) return;

    const leafletElement = currentLeafletRef(mapRef);
    const bounds = getBoundsFromGeoJson({
      geoJson: fitGeoJson
    });

    leafletElement.fitBounds(bounds, {
      padding: [50, 50]
    });
  }, [fitGeoJson, mapRef]);

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
    maxZoom: maxZoom || baseMaxZoom,
    minZoom: minZoom || baseMinZoom,
    maxNativeZoom: baseMaxNativeZoom,
    zoomControl: false,
    editable: true
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

  return (
    <div className={mapClassName}>
      <BaseMap ref={mapRef} {...mapSettings}>
        {children}
        <LayersControl ref={mapControlRef}>
          {mapLayers.base &&
            mapLayers.base.map((layer) => (
              <LayersControl.BaseLayer
                key={`base_layer_${layer.id}`}
                name={layer.name}
                checked={layer.isActive}
              >
                <Layer
                  layerKey={`base_layer_item_${layer.id}`}
                  layer={layer}
                  activeDateRange={activeDateRange}
                />
              </LayersControl.BaseLayer>
            ))}
          {mapLayers.overlay &&
            mapLayers.overlay.map((layer) => (
              <LayersControl.Overlay
                key={`overlay_layer_${layer.id}`}
                name={layer.name}
                checked={layer.isActive}
              >
                <Layer
                  layerKey={`overlay_layer_item_${layer.id}`}
                  layer={layer}
                  activeDateRange={activeDateRange}
                />
              </LayersControl.Overlay>
            ))}
        </LayersControl>
        <ZoomControl position="bottomright" />
      </BaseMap>
    </div>
  );
};

Map.propTypes = {
  children: PropTypes.node,
  forwardedRef: PropTypes.object,
  center: PropTypes.array,
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
  useMapEffect: PropTypes.func,
  activeDateRange: PropTypes.shape({}),
  fitGeoJson: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const MapWithRefs = React.forwardRef(function map (props, ref) {
  return <Map {...props} forwardedRef={ref} />;
});

MapWithRefs.displayName = 'MapWithRefs';

export default MapWithRefs;
