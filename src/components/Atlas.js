import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useAtlas } from '../hooks';

import Map from './Map';
import MapMarker from './MapMarker';
import MapDraw from './MapDraw';
import Panel from './Panel';
import ItemList from './ItemList';
import SearchComplete from './SearchComplete';

const Atlas = ({
  children,
  defaultCenter = {},
  zoom = 4,
  SidebarPanels,
  resolveOnSearch
}) => {
  const atlasSettings = {
    defaultCenter
  };

  const { mapPosition, updateMapPosition, resolveAtlasAutocomplete } = useAtlas(
    atlasSettings
  );

  const [results, updateResults] = useState();

  const { lat = 0, lng = 0 } = mapPosition;

  const mapSettings = {
    center: [lat, lng],
    zoom
  };

  const markerSettings = {
    position: [lat, lng],
    draggable: true,
    onDragEnd
  };

  /**
   * onDragEnd
   * @description Fires after a marker is dragged. Updates current position of map
   */

  function onDragEnd (event, ref) {
    const { current } = ref;
    const currentLatLng = current && current.leafletElement.getLatLng();

    updateMapPosition(currentLatLng);
  }

  /**
   * handleOnCreated
   * @description Fires when a layer is created
   */

  function handleOnCreated ({ center }) {
    updateMapPosition(center);
  }

  /**
   * handleOnEdited
   * @description Fires when a layer is edited
   */

  function handleOnEdited ({ center }) {
    updateMapPosition(center);
  }

  /**
   * handleOnSearch
   * @description Fires when a search is performed via SearchComplete
   */

  function handleOnSearch ({ x, y } = {}, date) {
    if (typeof x === 'undefined' || typeof y === 'undefined') {
      return;
    }

    const coordinates = {
      lat: y,
      lng: x
    };

    updateMapPosition(coordinates);

    resolveOnSearch(coordinates).then(data => {
      updateResults(data);
    });
  }

  return (
    <div className="atlas">
      <div className="atlas-sidebar">
        <Panel className="panel-clean">
          <SearchComplete
            onSearch={handleOnSearch}
            resolveQueryComplete={resolveAtlasAutocomplete}
          />
        </Panel>

        {SidebarPanels && (
          <SidebarPanels results={results} mapPosition={mapPosition} />
        )}
      </div>

      <Map className="atlas-map" {...mapSettings}>
        <MapDraw onCreated={handleOnCreated} onEdited={handleOnEdited}>
          <MapMarker {...markerSettings} />
        </MapDraw>
      </Map>

      <div className="atlas-extensions">{children}</div>
    </div>
  );
};

Atlas.propTypes = {
  defaultCenter: PropTypes.object,
  zoom: PropTypes.number
};

export default Atlas;
