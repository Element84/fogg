import React from 'react';
import { shallow } from 'enzyme';

import SearchFiltersMinMax from './';

describe('SearchFiltersMinMax', () => {
  const notice = 'Values outside of limits will default to min and max.';
  it('renders a SearchFiltersMinMax', () => {
    const MinMax = shallow(<SearchFiltersMinMax />);

    expect(MinMax.find('div.search-filters-minmax-input').exists()).toEqual(true);
    expect(MinMax.find('span.error').exists()).toEqual(true);
    expect(MinMax.find('p.search-filters-minmax-note').text()).toEqual(notice);
  });
});
