import React from 'react';
import { shallow } from 'enzyme';

import { Map } from '../../ui';

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

    const map = shallow(
      <Map {...mapSettings}>
        <div className={testClass}>{testText}</div>
      </Map>
    ).find('Map');
    const mapDive = map.dive();

    it('should render a blue_marble map by default', () => {
      expect(
        mapDive
          .find('Layer')
          .first()
          .prop('layer').id
      ).toEqual('blue_marble');
    });

    it('should render with the given center coordinates', () => {
      expect(map.prop('center')).toEqual(mapSettings.center);
    });

    it('should render children within the map', () => {
      expect(map.find(`.${testClass}`).text()).toEqual(testText);
    });
  });
});
