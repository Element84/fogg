import React from 'react';
import { shallow } from 'enzyme';

import { LensMap } from '../../ui';

describe('LensMap', () => {
  describe('Render', () => {
    const lensMap = shallow(<LensMap />);
    const lensMapDive = lensMap.dive();
    const map = lensMapDive.find('MapWithRefs');

    it('should render the component', () => {
      expect(lensMap.exists()).toEqual(true);
    });

    it('should render a Map component with forwarded refs', () => {
      expect(map.exists()).toEqual(true);
    });
  });
});
