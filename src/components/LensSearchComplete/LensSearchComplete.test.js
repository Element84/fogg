import React from 'react';
import { shallow } from 'enzyme';

import LensSearchComplete from './';

describe('LensSearchComplete', () => {
  describe('Render', () => {
    const lensSearchComplete = shallow(<LensSearchComplete />);
    const lensSearchCompleteDive = lensSearchComplete.dive();
    const searchComplete = lensSearchCompleteDive.find('SearchComplete');

    it('should render the component', () => {
      expect(lensSearchComplete.exists()).toEqual(true);
    });

    it('should render a SearchComplete component', () => {
      expect(searchComplete.exists()).toEqual(true);
    });
  });
});
