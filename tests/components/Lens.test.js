import React from 'react';
import { shallow } from 'enzyme';

import { Lens } from '../../ui';

describe('Lens', () => {
  describe('Render', () => {
    const lens = shallow(<Lens />);
    const lensMap = lens.find('LensMapWithRefs');
    const lensSearchComplete = lens.find('LensSearchComplete');

    it('should render a LensMap component', () => {
      expect(lensMap.exists()).toEqual(true);
    });

    it('should render a SearchComplete component', () => {
      expect(lensSearchComplete.exists()).toEqual(true);
    });
  });
});
