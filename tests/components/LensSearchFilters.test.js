import React from 'react';
import { shallow } from 'enzyme';

import { LensSearchFilters } from '../../ui';

describe('LensSearchFilters', () => {
  describe('Render', () => {
    const lensSearchFilters = shallow(<LensSearchFilters />);
    const searchFilters = lensSearchFilters.find('SearchFilters');

    it('should render the component', () => {
      expect(lensSearchFilters.exists()).toEqual(true);
    });

    it('should render a SearchFilters component', () => {
      expect(searchFilters.exists()).toEqual(true);
    });
  });
});
