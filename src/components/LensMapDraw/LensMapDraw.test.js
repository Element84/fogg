import React from 'react';
import { shallow } from 'enzyme';

import LensMapDraw from './';

describe('LensMapDraw', () => {
  describe('Render', () => {
    const lensMapDraw = shallow(<LensMapDraw />);
    const mapDraw = lensMapDraw.find('MapDrawWithRefs');

    it('should render the component', () => {
      expect(lensMapDraw.exists()).toEqual(true);
    });

    it('should render a MapDraw component with forwarded refs', () => {
      expect(mapDraw.exists()).toEqual(true);
    });
  });
});
