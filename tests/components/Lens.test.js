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
    const position = [0, 0];

    const lens = shallow(<Lens defaultCenter={ALEXANDRIA} zoom={zoom} />);
    const lensMap = lens.find('LensMap');
    const lensSearchComplete = lens.find('LensSearchComplete');

    it('should pass the given default center to the Map', () => {
      expect(
        lensMap
          .dive()
          .find('Map')
          .prop('center')
      ).toEqual(position);
    });

    it('should pass the given zoom to the Map', () => {
      expect(lensMap.prop('zoom')).toEqual(zoom);
    });

    it('should render a SearchComplete component', () => {
      expect(lensSearchComplete.exists()).toEqual(true);
    });
  });
});
