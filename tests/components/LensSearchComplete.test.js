import React from 'react';
import { shallow } from 'enzyme';

import { LensSearchComplete } from '../../ui';

describe('LensSearchComplete', () => {
  describe('Render', () => {
    const lensSearchComplete = shallow(<LensSearchComplete />);
    const searchComplete = lensSearchComplete.find('SearchComplete');

    it('should render the component', () => {
      expect(lensSearchComplete.exists()).toEqual(true);
    });

    it('should render a SearchComplete component', () => {
      expect(searchComplete.exists()).toEqual(true);
    });
  });
});
