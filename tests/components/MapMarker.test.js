import React from 'react';
import { shallow } from 'enzyme';

import MapMarker from 'components/MapMarker';

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

describe('MapMarker', () => {
  describe('Render', () => {
    const mapMarkerSettings = {
      position: [ALEXANDRIA.lat, ALEXANDRIA.lng],
      draggable: true
    };

    const mapmarker = shallow(<MapMarker {...mapMarkerSettings} />);

    it('should render with the position prop', () => {
      expect(mapmarker.prop('position')).toEqual(mapMarkerSettings.position);
    });
  });

  describe('Events', () => {
    const mapMarkerSettings = {
      position: [ALEXANDRIA.lat, ALEXANDRIA.lng],
      draggable: true,
      onDragEnd: handleOnDragEnd
    };

    const mapmarker = shallow(<MapMarker {...mapMarkerSettings} />);

    let test = 1;

    function handleOnDragEnd () {
      test++;
    }

    mapmarker.prop('onDragEnd')();

    it('should fire given onDragEnd event', () => {
      expect(test).toEqual(2);
    });
  });
});
