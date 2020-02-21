import React from 'react';
import { shallow } from 'enzyme';

import LensSearchPanelFilters from './';

describe('LensSearchPanelFilters', () => {
  describe('Render', () => {
    const lensSearchPanelFilters = shallow(<LensSearchPanelFilters />);
    const searchPanelFilters = lensSearchPanelFilters.find(
      'SearchPanelFilters'
    );

    it('should render the component', () => {
      expect(lensSearchPanelFilters.exists()).toEqual(true);
    });

    it('should render a SearchPanelFilters component', () => {
      expect(searchPanelFilters.exists()).toEqual(true);
    });
  });
});
