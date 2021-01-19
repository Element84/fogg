import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { kml } from '@tmcw/togeojson';
import axios from 'axios';

import Lens from '../../../components/Lens';
import Panel from '../../../components/Panel';
import LayerList from '../../../components/LayerList';

const DEFAULT_CENTER = {
  lat: 39.52052,
  lng: -122.19818
};

const LensLayers = () => {
  function viirsPointToLayer (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 2,
      stroke: false,
      color: 'red',
      fillOpacity: 1
    }).bindTooltip(`Lat: ${latlng.lat}, Lat: ${latlng.lng}`);
  }

  function insituPointToLayer (feature, latlng) {
    const icon = L.divIcon({
      className: 'insitu-icon',
      iconSize: L.Point(4, 4),
      html:
        '<div style="background: yellow; box-shadow: 0 0 10px black; height: 4px; width: 4px; border-radius: 50%;"><div>'
    });
    return L.marker(latlng, {
      icon
    }).bindTooltip(`Lat: ${latlng.lat}, Lat: ${latlng.lng}`);
  }

  // Run http-server --p 8080 --cors ./data/ from the project root to start the example data server
  const fetchVirrsLayerData = async () => {
    const response = await axios(
      '/data/VNP14IMGTDL_NRT_USA_contiguous_and_Hawaii_24h.kml'
    );

    const GeoJSON = kml(
      new window.DOMParser().parseFromString(response.data, 'text/xml')
    );

    return {
      name: 'VIIRS Fire Data',
      type: 'geojson',
      data: GeoJSON,
      options: {
        pointToLayer: viirsPointToLayer
      }
    };
  };

  const fetchInsituLayerData = async () => {
    const response = await axios('/data/in-situ-1.geojson');
    return {
      name: 'Reported Events',
      type: 'geojson',
      data: response.data,
      options: {
        pointToLayer: insituPointToLayer
      }
    };
  };

  const layers = {
    base: [
      {
        name: 'MODIS Aqua',
        serviceName: 'MODIS_Aqua_CorrectedReflectance_TrueColor',
        type: 'service'
      },
      {
        name: 'MODIS Terra',
        serviceName: 'MODIS_Terra_CorrectedReflectance_TrueColor',
        type: 'service'
      },
      {
        name: 'Open Street Maps',
        serviceName: 'open_street_map',
        type: 'service'
      },
      {
        name: 'Open Street Maps Test for Story',
        serviceName: 'open_street_map_test_for_story',
        type: 'service'
      }
    ],
    overlay: [
      {
        name: 'VIIRS Fire Data',
        type: 'data',
        data: {
          type: 'geojson',
          data: {},
          options: {
            viirsPointToLayer
          }
        }
      },
      {
        name: 'Reported Events',
        type: 'data',
        data: {
          type: 'geojson',
          data: {},
          options: {
            insituPointToLayer
          }
        }
      },
      {
        name: 'Coastlines',
        serviceName: 'coastlines',
        defaultIsActive: true,
        type: 'service'
      }
    ]
  };

  const services = [
    {
      name: 'open_street_map_test_for_story',
      format: 'png',
      projections: 'epsg3857',
      attribution: 'Test For Story - &copy; OpenStreetMap contributors',
      maxZoom: 18,
      nativeZoom: 18,
      tileSize: 256,
      tileEndpoint: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
  ];

  const SidebarPanels = ({ layers, toggleLayer, getDataForLayers }) => {
    const getData = () => {
      const fetchInsituLayerData = async () => {
        const response = await axios('/data/in-situ-2.geojson');
        return {
          name: 'Reported Events',
          type: 'geojson',
          data: response.data,
          options: {
            pointToLayer: insituPointToLayer
          }
        };
      };

      const fetchVirrsLayerData = async () => {
        const response = await axios(
          '/data/VNP14IMGTDL_NRT_USA_contiguous_and_Hawaii_24h-2.kml'
        );

        const GeoJSON = kml(
          new window.DOMParser().parseFromString(response.data, 'text/xml')
        );

        return {
          name: 'VIIRS Fire Data',
          type: 'geojson',
          data: GeoJSON,
          options: {
            pointToLayer: viirsPointToLayer
          }
        };
      };
      getDataForLayers([fetchInsituLayerData, fetchVirrsLayerData]);
    };
    return (
      <>
        <Panel header="Toggleable Layers!">
          <p>
            <b>Base</b>
          </p>
          <LayerList layers={layers.base} onChange={toggleLayer} />
          <p>
            <b>Overlay</b>
          </p>
          <LayerList layers={layers.overlay} onChange={toggleLayer} />
          <p>
            <button onClick={() => getData()}>Sync</button>
          </p>
        </Panel>
      </>
    );
  };

  SidebarPanels.propTypes = {
    layers: PropTypes.shape({
      base: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          serviceName: PropTypes.string
        })
      ),
      overlay: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          serviceName: PropTypes.string
        })
      )
    }),
    toggleLayer: PropTypes.func.isRequired,
    getDataForLayers: PropTypes.func.isRequired
  };

  return (
    <>
      <Lens
        defaultCenter={DEFAULT_CENTER}
        zoom={3}
        maxZoom={15}
        minZoom={3}
        availableLayers={layers}
        availableServices={services}
        projection="epsg3857"
        search={false}
        SidebarComponents={SidebarPanels}
        hideNativeLayers={true}
        fetchLayerData={[fetchVirrsLayerData, fetchInsituLayerData]}
        activeDateRange={{
          end: '2018-11-08 5:00:00'
        }}
      />
    </>
  );
};

export default LensLayers;
