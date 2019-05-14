import React from 'react';
import { shallow } from 'enzyme';

import { Atlas } from '../../ui';

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

describe('Atlas', () => {
  describe('Render', () => {
    const zoom = 3;
    const position = [ALEXANDRIA.lat, ALEXANDRIA.lng];

    const atlas = shallow(<Atlas defaultCenter={ALEXANDRIA} zoom={zoom} />);

    it('should pass the given default center to the Map', () => {
      expect(atlas.find('Map').prop('center')).toEqual(position);
    });

    it('should pass the given zoom to the Map', () => {
      expect(atlas.find('Map').prop('zoom')).toEqual(zoom);
    });

    it('should render a SearchComplete component', () => {
      expect(atlas.find('SearchComplete').exists()).toEqual(true);
    });
  });
});
