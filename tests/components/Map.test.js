import React from 'react';
import { shallow } from 'enzyme';

import { Map, MapService } from '../../';

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

describe('Map', () => {
  describe('Render', () => {
    const mapSettings = {
      center: [ALEXANDRIA.lat, ALEXANDRIA.lng],
      zoom: 5
    };

    const testClass = 'test';
    const testText = 'Hi';

    const service = new MapService('blue_marble');

    const map = shallow(
      <Map {...mapSettings}>
        <div className={testClass}>{testText}</div>
      </Map>
    ).find('Map');

    it('should render a blue_marble map by default', () => {
      expect(map.prop('crs').code).toEqual(service.crs.code);
    });

    it('should render with the given center coordinates', () => {
      expect(map.prop('center')).toEqual(mapSettings.center);
    });

    it('should render children within the map', () => {
      expect(map.find(`.${testClass}`).text()).toEqual(testText);
    });
  });
});
