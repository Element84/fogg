import React from 'react';
import { shallow } from 'enzyme';

import { Lens } from '../../ui';

const ALEXANDRIA = {
  lat: 38.8048,
  lng: -77.0469
};

describe('Lens', () => {
  describe('Render', () => {
    const zoom = 3;
    const position = [ALEXANDRIA.lat, ALEXANDRIA.lng];

    const lens = shallow(<Lens defaultCenter={ALEXANDRIA} zoom={zoom} />);

    it('should pass the given default center to the Map', () => {
      expect(lens.find('Map').prop('center')).toEqual(position);
    });

    it('should pass the given zoom to the Map', () => {
      expect(lens.find('Map').prop('zoom')).toEqual(zoom);
    });

    it('should render a SearchComplete component', () => {
      expect(lens.find('SearchComplete').exists()).toEqual(true);
    });
  });
});
